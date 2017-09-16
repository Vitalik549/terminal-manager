package com.manager.terminal.entities;

import java.io.File;
import java.util.List;
import java.util.Objects;

public class Group {

    private Long id;
    private String name;
    private String description;
    private File startingDirectory;
    private List<Job> jobs;

    public Group() {}

    public Long getId() {
        return id;
    }

    public Group setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Group setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Group setDescription(String description) {
        this.description = description;
        return this;
    }

    public File getStartingDirectory() {
        return startingDirectory;
    }

    public Group setStartingDirectory(File startingDirectory) {
        this.startingDirectory = startingDirectory;
        return this;
    }

    public List<Job> getJobs() {
        return jobs;
    }

    public Group setJobs(List<Job> jobs) {
        this.jobs = jobs;
        return this;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, name, description, startingDirectory);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Group job = (Group) o;
        return Objects.equals(id, job.id) &&
                Objects.equals(name, job.name) &&
                Objects.equals(description, job.description) &&
                Objects.equals(startingDirectory, job.startingDirectory);
    }

    @Override
    public String toString() {
        return "Group{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", startingDirectory='" + startingDirectory + '\'' +
                ", jobs=[" + jobs + ']' +
                '}';
    }
}
