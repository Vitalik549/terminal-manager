package com.manager.terminal.entities;

import com.manager.terminal.utils.Env;
import com.manager.terminal.utils.ProcessHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.manager.terminal.utils.FileUtils.createLogFile;
import static com.manager.terminal.utils.FileUtils.getRedirect;
import static java.lang.ProcessBuilder.Redirect;

@Component
public class Executor {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private static ThreadPoolTaskExecutor taskExecutor;
    private static List<Job> RUNNING = Collections.synchronizedList(new ArrayList<>());

    private Executor() {
        initializeTaskExecutor();
    }

    public void restart() {
        shutdown();
        initializeTaskExecutor();
    }

    private void initializeTaskExecutor() {
        taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(1);
        taskExecutor.setMaxPoolSize(20);
        taskExecutor.setWaitForTasksToCompleteOnShutdown(false);
        taskExecutor.initialize();
    }

    private void shutdown() {
        taskExecutor.shutdown();
    }

    public List<Job> getRunningJobs() {
        return RUNNING;
    }

    public void startJob(Job job) {
        taskExecutor.submit(jobToRunnable(job));
    }

    public void stopJob(Job job) {
        if (!getRunningJobs().contains(job)) {
            log.info("Unable to stop not running job: " + job);
            return;
        }
        ProcessHelper
                .getPIDsOfAllJobProcesses(job)
                .forEach(ProcessHelper::killProcessById);
        RUNNING.remove(job);
    }

    private Runnable jobToRunnable(Job job) {
        return () -> {
            log.info("STARTING JOB:\n" + job);

            File logFile = createLogFile(job);
            Redirect logsRedirect = getRedirect(job.getLogStrategy(), logFile);

            ProcessBuilder processBuilder = new ProcessBuilder(Env.BASH, Env.BASH_COMMAND_PARAM, job.getCommand())
                    .directory(job.getStartingDirectory())
                    .redirectOutput(logsRedirect)
                    .redirectError(logsRedirect);

            try {
                Process process = processBuilder.start();
                job.setProcess(process);
                RUNNING.add(job);
            } catch (Throwable exception) {
                log.info("FAILED to execute " + job, exception);
            }finally {
                RUNNING.remove(job);
                log.info(String.format("FINISHED JOB: {id:'%s', name:'%s'}", job.getName(), job.getId()));
            }
        };
    }
}
