package com.manager.terminal.services;

import com.manager.terminal.entities.Group;
import com.manager.terminal.entities.Job;
import com.manager.terminal.repositories.GroupRepository;
import com.manager.terminal.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobService {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private GroupRepository groupRepository;

    public List<Job> getAllJobs() {
        List<Job> list = new ArrayList<>();
        jobRepository.findAll().forEach(list::add);
        return list;
    }

    public Job addJob(Integer groupId, Job newJob) {
        Group group = groupRepository.findOne(groupId);
        newJob.setGroup(group);

        return jobRepository.save(newJob);
    }

    /**
     * @implNote findOne() uses int, as int marked as the primary key
     * and JobRepository extends CrudRepository<Job, int>
     */
    public Job getJob(Integer id) {
        return jobRepository.findOne(id);
    }

    @Transactional
    public Job saveJob(Job job) {
        return jobRepository.save(job);

       // if (job.getId() == null) {
       //     em.persist(job);
       //     return job;
       // } else {
       //     return em.merge(job);
       // }
    }

    public void deleteJob(Integer id) {
        jobRepository.delete(id);
    }
}
