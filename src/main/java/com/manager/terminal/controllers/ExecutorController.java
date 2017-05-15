package com.manager.terminal.controllers;

import com.manager.terminal.entities.Job;
import com.manager.terminal.services.ExecutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExecutorController {

    @Autowired
    private ExecutorService executorService;

    @RequestMapping(method = RequestMethod.POST, value = "/start/job")
    public void startJob(@RequestBody Job job){
        executorService.startJob(job);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/stop/job")
    public void stopJob(@RequestBody Job job){
        executorService.stopJob(job);
    }

    @RequestMapping("/get/running")
    public @ResponseBody List<Job> getRunningJobs(){
        return executorService.getRunningJobs();
    }

    @RequestMapping("/exec/restart")
    public void restart(){
        executorService.restart();
    }
}
