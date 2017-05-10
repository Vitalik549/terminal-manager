package com.manager.terminal.services;

import com.manager.terminal.entities.Group;
import com.manager.terminal.entities.Job;
import com.manager.terminal.repositories.GroupRepository;
import com.manager.terminal.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private JobRepository jobRepository;

    public List<Group> getAllGroups() {
        List<Group> list = new ArrayList<>();
        groupRepository.findAll().forEach(list::add);
        return list;
    }

    /**
     * @implNote findOne() uses int, as int marked as the primary key
     * and JobRepository extends CrudRepository<Job, int>
     */
    public Group getGroup(Integer id) {
        return groupRepository.findOne(id);
    }

    public Group getGroupByName(String name) {
        return groupRepository.findOneByName(name);
    }

    @Transactional
    public Group saveGroup(Group group) {
        return groupRepository.save(group);
    }

    public void deleteGroup(Integer id) {
        groupRepository.delete(id);
    }

    public void setJobsOrder(Integer groupId, long... ids) {
        Group group = groupRepository.findOne(groupId);
        List<Job> reordered = order(group.getJobs(), ids);
        group.setJobs(reordered);
        groupRepository.save(group);
    }




    public static List<Job> order(List<Job> list, long... ids){
        List<Job> reordered = new ArrayList<>();
        if (list.size() != ids.length)  throw new RuntimeException("can't set such order, as amount of jobs is not same");

        for (long id: ids) {

            for (int i = 0; i < list.size(); i++) {
                Job job = list.get(i);
                if (job.getId()==(id)){
                    reordered.add(job);
                }
            }

        }
        if (reordered.size() != ids.length)  throw new RuntimeException("Duplicated items were in list, please recheck");
        return reordered;
    }

}
