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

    public void startJob(Job job){
        executor.startJob(job);
    }

    public void stopJob(Job job){
        executor.stopJob(job);
    }

    public boolean isRunning(Job job){
        return getRunningJobs().contains(job);
    }

    public List<Job> getRunningJobs(){
        return executor.getRunningJobs();
    }

    public void restart(){
        executor.restart();
    }
}
