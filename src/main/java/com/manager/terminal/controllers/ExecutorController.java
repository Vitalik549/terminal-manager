package com.manager.terminal.controllers;

import com.manager.terminal.entities.Job;
import com.manager.terminal.services.ExecutorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ExecutorController {

    private static final Logger log = LoggerFactory.getLogger(ExecutorController.class);

    @Autowired
    private ExecutorService executorService;

    @RequestMapping(method = RequestMethod.POST, value = "/start/job")
    public void startJob(@RequestBody @Valid Job job){
        log.info("--> POST: START " + job);
        executorService.startJob(job);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/stop/job")
    public void stopJob(@RequestBody Job job){
        log.info("--> POST: STOP " + job);
        executorService.stopJob(job);
    }

    @RequestMapping("/get/running")
    public @ResponseBody List<Job> getRunningJobs(){
        return executorService.getRunningJobs();
    }

    @RequestMapping("/exec/restart")
    public void restart(){
        log.info("--> RESTART EXECUTOR");
        executorService.restart();
    }
}
