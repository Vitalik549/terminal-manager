package com.manager.terminal.controllers;

import com.manager.terminal.entities.Job;
import com.manager.terminal.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class JobController {

    @Autowired
    private JobService jobService;

    @RequestMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @RequestMapping("/jobs/{id}")
    public Job getJob(@PathVariable Integer id) {
        return jobService.getJob(id);
    }

  //  @RequestMapping(method = RequestMethod.POST, value = "/jobs")
  //  public Job addJob(@RequestBody Job job) {
  //      return jobService.saveJob(job);
  //  }

    @RequestMapping(method = RequestMethod.DELETE, value = "/jobs/{id}")
    public void deleteJob(@PathVariable Integer id) {
        jobService.deleteJob(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{groupId}/addjob")
    public Job addJob(@PathVariable Integer groupId, @RequestBody Job job) {
        return jobService.addJob(groupId, job);
    }
}