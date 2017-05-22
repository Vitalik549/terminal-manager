package com.manager.terminal.utils;

public enum LogStrategy {
    APPEND("append", "Appending logs to existing file."),
    OVERRIDE("override", "Override existing log file with new data."),
    ITERATE("iterate", "If log file with such name exists - creates new file with name '%oldFileName% (+1)'");

    private String name;

    public String getDescription() {
        return description;
    }

    private String description;

    LogStrategy(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public static LogStrategy get(String name) {
        return LogStrategy.valueOf(name.toUpperCase());
    }

    public static void main(String[] args) {
        LogStrategy l = LogStrategy.get("append");
        System.out.println(l.name);
    }

}
