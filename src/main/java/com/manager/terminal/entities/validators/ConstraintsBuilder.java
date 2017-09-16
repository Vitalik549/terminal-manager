package com.manager.terminal.entities.validators;

import javax.validation.ConstraintValidatorContext;
import java.util.Objects;
import java.util.function.Function;

class ConstraintsBuilder {

    private ConstraintValidatorContext context;
    private boolean isValid = true;
    private boolean skipChecks = false;

    boolean isValid() {
        return isValid;
    }

    ConstraintsBuilder(ConstraintValidatorContext context) {
        this.context = context;
        context.disableDefaultConstraintViolation();
    }

    /**
     * If assert fails - all other checks/asserts will be skipped and invalid result will be returned.
     * Use for [Object!=null] assert after which Object attributes should be checked.
     */
    <T> ConstraintsBuilder assertThat(T object, Function<T, Boolean> constraint, String error) {
        check(true, object, constraint, error);
        if (!isValid) skipChecks = true;
        return this;
    }

    <T> ConstraintsBuilder checkNotNull(T object, String error) {
        return checkNot(object, Objects::isNull, error);
    }

    <T> ConstraintsBuilder checkThat(T object, Function<T, Boolean> constraint, String error) {
        return check(true, object, constraint, error);
    }

    <T> ConstraintsBuilder checkNot(T object, Function<T, Boolean> constraint, String error) {
        return check(false, object, constraint, error);
    }

    /** To enable checks after asserts*/
    public ConstraintsBuilder enableChecks() {
        this.skipChecks = false;
        return this;
    }

    private <T> ConstraintsBuilder check(boolean isTrueExpected, T object, Function<T, Boolean> constraint, String error) {
        if (skipChecks) return this;

        if (constraint.apply(object) != isTrueExpected) {
            context
                    .buildConstraintViolationWithTemplate(error)
                    .addConstraintViolation();
            isValid = false;
        }
        return this;
    }

}
