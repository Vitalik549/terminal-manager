package com.manager.terminal.entities.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.io.File;
import java.util.Objects;

final class DirectoryValidator implements ConstraintValidator<ValidDirectory, File> {

    @Override
    public void initialize(ValidDirectory constraintAnnotation) {
    }

    @Override
    public boolean isValid(File file, ConstraintValidatorContext context) {
        String dir = context.getDefaultConstraintMessageTemplate() + " ";
        return new ConstraintsBuilder(context)
                .assertThat(file, Objects::nonNull, dir + "is required!")
                .checkThat(file, f-> f.exists() && f.isDirectory(), dir + "does not exist!")
                .isValid();
    }
}