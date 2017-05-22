package com.manager.terminal.entities;

import com.manager.terminal.utils.LogStrategy;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Job {

    private Integer id;
    private String name;
    private String description;
    private String command;
    private int position;
    private Integer groupId;
    private File startingDirectory;
    transient private Process process;
    private File baseLogFile;

    private LogStrategy logStrategy;

    private List<Integer> processTree = new ArrayList<>();

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

    public File getStartingDirectory() {
        return startingDirectory;
    }

    public void setStartingDirectory(File startingDirectory) {
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

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public File getBaseLogFile() {
        return baseLogFile;
    }


    public LogStrategy getLogStrategy() {
        return logStrategy;
    }

    public void setLogStrategy(String logStrategy) {
        this.logStrategy = LogStrategy.get(logStrategy);
    }


    public void setBaseLogFile(String baseLogFile) {
        File file = new File(baseLogFile);
        File dir = file.getParentFile();
        if (!dir.isDirectory()) throw new RuntimeException("There's no directory: " + dir.getAbsolutePath());
        if (!dir.exists()) throw new RuntimeException("Parent dir doesn't exist: " + dir.getAbsolutePath());
        this.baseLogFile = file;
    }


    public Job initializeAdditionalFields() {

        return this;
    }


}
