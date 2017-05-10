package com.manager.terminal.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "groups")
public class Group {

    @Id //mark as primary key
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", unique = true)
    private String name;
    private String description;

    @Column(name = "directory", nullable = false)
    private String startingDirectory;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "group")
    @JsonManagedReference
    @OrderBy("position ASC")
    private List<Job> jobs;

    public Group() {
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

    public String getStartingDirectory() {
        if (startingDirectory == null) {
            return ".";
        }
        return startingDirectory;
    }

    public void setStartingDirectory(String startingDirectory) {
        this.startingDirectory = startingDirectory;
    }

    public List<Job> getJobs() {
        return jobs;
    }

    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }

    public void addJob(Job job) {
        this.jobs.add(job);
    }

    public void removeJob(Job job){
        this.jobs.remove(job);
    }

    public void removeJob(int jobId){
        this.jobs.removeIf(job -> job.getId().equals(jobId));
    }

  //  public void setJobs(int[] jobs) {
  //      this.jobs = new ArrayList<>();
  //      addJobs(jobs);
  //  }
//
  //  public void addJobs(int[] jobs) {
  //      Arrays.stream(jobs).forEach(this::addJob);
  //  }
//
  //  public void addJob(int jobId) {
  //      this.jobs.add(jobService.getJob(jobId));
  //  }

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
