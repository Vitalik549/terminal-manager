package com.manager.terminal.entities;

import com.manager.terminal.entities.validators.ValidDirectory;
import com.manager.terminal.entities.validators.ValidJob;
import com.manager.terminal.utils.LogStrategy;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@ValidJob
public class Job {

    private Long id;
    private String name;
    private String description;
    private String command;
    private Long groupId;
    @ValidDirectory(message = "Starting directory")
    private File startingDirectory;
    transient private Process process;
    private File baseLogFile;
    private LogStrategy logStrategy;
    private List<Integer> processTree = new ArrayList<>();

    public Job() {}

    public Long getId() {
        return id;
    }

    public Job setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Job setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Job setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getCommand() {
        return command;
    }

    public Job setCommand(String command) {
        this.command = command;
        return this;
    }

    public Long getGroupId() {
        return groupId;
    }

    public Job setGroupId(Long groupId) {
        this.groupId = groupId;
        return this;
    }

    public File getStartingDirectory() {
        return startingDirectory;
    }

    public Job setStartingDirectory(File startingDirectory) {
        this.startingDirectory = startingDirectory;
        return this;
    }

    public Process getProcess() {
        return process;
    }

    public Job setProcess(Process process) {
        this.process = process;
        return this;
    }

    public File getBaseLogFile() {
        return baseLogFile;
    }

    public Job setBaseLogFile(File baseLogFile) {
        this.baseLogFile = baseLogFile;
        return this;
    }

    public LogStrategy getLogStrategy() {
        return logStrategy;
    }

    public Job setLogStrategy(LogStrategy logStrategy) {
        this.logStrategy = logStrategy;
        return this;
    }

    public List<Integer> getProcessTree() {
        return processTree;
    }

    public Job setProcessTree(List<Integer> processTree) {
        this.processTree = processTree;
        return this;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, name, description, command, startingDirectory, process, processTree);
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
                ", processTree=" + processTree +
                '}';
    }
}
