package com.manager.terminal.controllers;

import com.manager.terminal.entities.Job;
import com.manager.terminal.services.ExecutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExecutorController {

    @Autowired
    private ExecutorService executorService;

    @RequestMapping("/exec/{jobId}/start")
    public void startJob(@PathVariable Integer jobId){
        executorService.startJob(jobId);
    }

    @RequestMapping("/exec/{jobId}/stop")
    public void stopJob(@PathVariable Integer jobId){
        executorService.stopJob(jobId);
    }

    @RequestMapping("/exec/running")
    public @ResponseBody List<Job> getRunningJobs(){
        return executorService.getRunningJobs();
    }

    @RequestMapping("/exec/restart")
    public void restart(){
        executorService.restart();
    }
}
