package com.manager.terminal.entities;

import com.manager.terminal.utils.Env;
import com.manager.terminal.utils.ProcessHelper;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class Executor {

    private static ThreadPoolTaskExecutor executor;
    private static List<Job> RUNNING = Collections.synchronizedList(new ArrayList<>());

    private Executor() {
        initialize();
    }

    public void restart() {
        shutdown();
        initialize();
    }

    private void initialize() {
        executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(1);
        executor.setMaxPoolSize(20);
        executor.setWaitForTasksToCompleteOnShutdown(false);
        executor.initialize();
    }

    private void shutdown() {
        executor.shutdown();
    }

    public List<Job> getRunningJobs() {
        return RUNNING;
    }


    public void startJob(Job job) {
        executor.submit(jobToRunnable(job));
    }

    public void stopJob(Job job) {
        if (!getRunningJobs().contains(job)) {
            System.out.println("NO SUCH JOB");
            return;
        }
        ProcessHelper
                .getPIDsOfAllJobProcesses(job)
                .forEach(ProcessHelper::killProcessById);
        RUNNING.remove(job);
    }

    private Runnable jobToRunnable(Job job) {
        return () -> {
            try {
                String[] cmd = {Env.BASH, Env.BASH_COMMAND_PARAM, job.getCommand()};
                Process process = ProcessHelper.execute(cmd, null, new File(job.getStartingDirectory()));
                job.setProcess(process);
                RUNNING.add(job);

                ProcessHelper.logProcess(process);
                RUNNING.remove(job);
            } catch (IOException io) {
                System.out.println("Failed to execute " + job);
            }
        };
    }
}
