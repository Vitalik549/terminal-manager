package com.manager.terminal.services;

import com.manager.terminal.entities.Executor;
import com.manager.terminal.entities.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExecutorService {

    @Autowired
    private Executor executor;

    @Autowired
    private JobService jobService;

    public void startJob(Integer jobId){
        executor.startJob(jobService.getJob(jobId));
    }

    public void stopJob(Integer jobId){
        executor.stopJob(jobService.getJob(jobId));
    }

    public boolean isRunning(Integer jobId){
        return getRunningJobs().contains(jobService.getJob(jobId));
    }

    public List<Job> getRunningJobs(){
        return executor.getRunningJobs();
    }

    public void restart(){
        executor.restart();
    }
}
