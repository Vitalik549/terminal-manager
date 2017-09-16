package com.manager.terminal.utils;

public enum LogStrategy {
    APPEND("Appending logs to existing file."),
    OVERRIDE("Override existing log file with new data."),
    ITERATE("If log file with such name exists - creates new file with name '%oldFileName% (+1)'");

    public String getDescription() {
        return description;
    }

    private String description;

    LogStrategy(String description) {
        this.description = description;
    }

    public static LogStrategy get(String name) {
        return LogStrategy.valueOf(name.toUpperCase());
    }
}
