package com.manager.terminal.entities.validators;

import com.manager.terminal.entities.Job;
import org.thymeleaf.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

final class JobValidator implements ConstraintValidator<ValidJob, Job> {

    @Override
    public void initialize(ValidJob constraintAnnotation) {
    }

    @Override
    public boolean isValid(Job job, ConstraintValidatorContext context) {
        //  .checkNotNull(job.getBaseLogFile(), "Base log file is required")
        return new ConstraintsBuilder(context)
                .checkNotNull(job, "Job is required")
                .checkNot(job.getCommand(), StringUtils::isEmptyOrWhitespace, "Command is required")
                .checkNot(job.getName(), StringUtils::isEmptyOrWhitespace, "Job name is required")

                .assertThat(job.getBaseLogFile(), Objects::nonNull, "Base log file is required")
                .checkThat(job.getBaseLogFile(),
                        f -> f.getParentFile() != null && f.getParentFile().exists(),
                        "Parent directory for base log file does not exist!")
                .enableChecks()
                .isValid();
    }
}
