package com.manager.terminal.utils;

import com.manager.terminal.entities.Job;
import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.io.IOException;

import static java.lang.ProcessBuilder.Redirect;

public class FileUtils {

    public static Redirect getRedirect(LogStrategy logStrategy, File logFile) {
        return logStrategy.equals(LogStrategy.APPEND)
                ? Redirect.appendTo(logFile)
                : Redirect.to(logFile);

    }

    public static File createLogFile(Job job) {
        File file = job.getBaseLogFile();

        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException(String.format("Cant't create log file <%s> for job: %s", file, job));
            }
            return file;
        }

        if (job.getLogStrategy().equals(LogStrategy.ITERATE)) {
            file = iterate(file);
        }
        return file;
    }

    public static File iterate(File file) {
        boolean exists = file.exists();
        if (!exists) return file;

        String fullName = file.getName();
        String ext = FilenameUtils.getExtension(fullName);
        String name = FilenameUtils.getBaseName(fullName);

        int i = 1;

        while (exists) {
            file = new File(file.getParent(), String.format("%s (%s).%s", name, i++, ext));
            exists = file.exists();
            //todo remove when become brave!
            if (i > 100) throw new RuntimeException("Stop this Madness!!! I'm scared of infinite loop!");
        }
        return file;
    }
}
