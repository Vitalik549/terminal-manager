package com.manager.terminal.entities.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = JobValidator.class)
public @interface  ValidJob {
    String message() default "Job is not valid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}