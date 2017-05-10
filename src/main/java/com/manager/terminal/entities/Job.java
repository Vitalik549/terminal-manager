package com.manager.terminal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "jobs", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"job_group_id", "position"})})
public class Job {

    @Id //mark as primary key
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String name;
    private String description;
    private String command;
    private int position;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_group_id")
    @JsonBackReference
    private Group group;

    @Column(name = "directory")
    private String startingDirectory;

    @JsonIgnore
    @Transient
    transient private Process process;

    @JsonIgnore
    @Transient
    private long pid = -1;

    @JsonIgnore
    @Transient
    private List<Integer> processTree = new ArrayList<>();

    public Job(int id, String name, String command, String description, String startingDirectory) {
        super();
        this.id = id;
        this.name = name;
        this.command = command;
        this.description = description;
        this.startingDirectory = startingDirectory;
    }

    public Job() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public Process getProcess() {
        return process;
    }

    public void setProcess(Process process) {
        this.process = process;
    }

    public long getPid() {
        return pid;
    }

    public void setPid(long pid) {
        this.pid = pid;
    }

    public String getStartingDirectory() {
        if (startingDirectory == null) {
            return ".";
        }
        return startingDirectory;
    }

    public void setStartingDirectory(String startingDirectory) {
        this.startingDirectory = startingDirectory;
    }

    public List<Integer> getProcessTree() {
        return processTree;
    }

    public void setProcessTree(List<Integer> processTree) {
        this.processTree = processTree;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, name, description, command, startingDirectory, process, pid, processTree);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Job job = (Job) o;
        return Objects.equals(id, job.id) &&
                Objects.equals(name, job.name) &&
                Objects.equals(description, job.description) &&
                Objects.equals(command, job.command) &&
                Objects.equals(startingDirectory, job.startingDirectory) &&
                Objects.equals(process, job.process) &&
                Objects.equals(pid, job.pid) &&
                Objects.equals(processTree, job.processTree);
    }

    @Override
    public String toString() {
        return "Job{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", command='" + command + '\'' +
                ", startingDirectory='" + startingDirectory + '\'' +
                ", pid='" + pid + '\'' +
                ", processTree=" + processTree +
                '}';
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
