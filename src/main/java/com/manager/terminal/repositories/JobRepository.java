package com.manager.terminal.repositories;

import com.manager.terminal.entities.Job;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

// generic for <Job, String> as primary key field is String id
@Transactional
public interface JobRepository extends CrudRepository<Job, Integer>{}
