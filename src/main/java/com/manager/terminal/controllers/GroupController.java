package com.manager.terminal.controllers;

import com.manager.terminal.entities.Group;
import com.manager.terminal.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class GroupController {

    @Autowired
    private GroupService groupService;

    @RequestMapping("/groups")
    public List<Group> getAllGroups() {
        return groupService.getAllGroups();
    }

    @RequestMapping("/groups/{id}")
    public Group getGroupById(@PathVariable Integer id) {
        return groupService.getGroup(id);
    }

    @RequestMapping("/groups/get")
    public Group getGroup(@RequestParam Map<String, String> requestParams) {
        String id = requestParams.get("id");
        String name = requestParams.get("name");
        Group group = null;

        if (id != null) {
            group = groupService.getGroup(Integer.valueOf(id));
        }
        if (group == null && name != null) {
            group = groupService.getGroupByName(name);
        }

        return group;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/groups")
    public void saveGroup(@RequestBody Group group) {
        groupService.saveGroup(group);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/groups/{id}")
    public void deleteGroup(@PathVariable Integer id) {
        groupService.deleteGroup(id);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, value = "groups/order/{id}")
    public void setJobsOrder(@PathVariable Integer id, @RequestBody long[] ids) {
        groupService.setJobsOrder(id, ids);
        // code to handle request

    }
}