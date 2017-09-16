package com.manager.terminal.utils;

import com.manager.terminal.entities.Job;
import org.apache.tomcat.util.http.fileupload.util.Streams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ProcessHelper {

    private static final Logger log = LoggerFactory.getLogger(ProcessHelper.class);

    public static synchronized int getPidOfProcess(Process p) {
        int pid = -1;

        try {
            if (p.getClass().getName().equals("java.lang.UNIXProcess")) {
                Field f = p.getClass().getDeclaredField("pid");
                f.setAccessible(true);
                pid = f.getInt(p);
                f.setAccessible(false);
            }
        } catch (Exception e) {
            pid = -1;
        }
        return pid;
    }

    public static List<Integer> getPidDescendantTree(int pid) {
        List<Integer> listToCollect = new ArrayList<>();
        String result = null;

        try {
            InputStream is = Runtime.getRuntime().exec("pgrep -P " + pid).getInputStream();
            result = Streams.asString(is);
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (StringUtils.isEmptyOrWhitespace(result)) return listToCollect;

        for (String p : Arrays.asList(result.split("\n"))) {
            if (p.length() > 5 || p.equals("00001") || p.equals("1"))
                throw new RuntimeException("Process id is " + p + " , not going to kill! ");

            listToCollect.add(Integer.valueOf(p));
        }
        return listToCollect;
    }

    public static void killProcessById(Integer pid) {
        try {
            execute("kill -9 " + pid);
        } catch (IOException e) {
            e.printStackTrace();
            log.info("CANT KILL PROCESS WITH ID " + pid);
        }
    }

    public static Process execute(String command) throws IOException {
        return Runtime.getRuntime().exec(command);
    }

    public static Process execute(String[] cmdarray, String[] envp, File dir) throws IOException {
        return Runtime.getRuntime().exec(cmdarray, envp, dir);
    }

    public static void logProcess(Process process, File file) throws IOException {

        Files.copy(process.getInputStream(), Paths.get(file.toURI()), StandardCopyOption.REPLACE_EXISTING);

        Files.lines(file.toPath()).forEach(log::info); //todo remove
    }

    public static List<Integer> getPIDsOfAllJobProcesses(Job job) {
        int mainProcessPid = ProcessHelper.getPidOfProcess(job.getProcess());

        List<Integer> PIDs = ProcessHelper.getPidDescendantTree(mainProcessPid);

        PIDs.add(mainProcessPid);
        job.setProcessTree(PIDs);

        //Todo remove
        if (PIDs.size() > 7) throw new RuntimeException("Tree is too big for testing mode =)");
        return PIDs;
    }
}
