package com.manager.terminal.utils;

import com.manager.terminal.entities.Executor;
import com.manager.terminal.entities.Job;
import com.sun.istack.internal.Nullable;
import org.apache.tomcat.util.http.fileupload.util.Streams;

import java.io.*;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ProcessHelper {

    public static void getPidDescr(int... pids) {
        StringBuilder builder = new StringBuilder("ps u -p");
        Arrays.stream(pids).forEach(pid-> builder.append(" ").append(String.valueOf(pid)));
        try {
            logProcess(execute(builder.toString()), Executor.file);
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<String> list = Arrays.stream(pids).mapToObj(String::valueOf).collect(Collectors.toList());
        System.out.println("-p " + String.join(" ", list));
    }


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

    //  try {
    //     System.out.println("GOING TO KILL TREE");
    //     System.out.println(Streams.asString(Runtime.getRuntime().exec("pstree " + pid).getInputStream()));
    // } catch (IOException e) {
    //     e.printStackTrace();
    // }

    public static List<Integer> getPidDescendantTree(int pid) {
        List<Integer> processes = new ArrayList<>();
        getProcessSiblings(processes, pid);
        return processes;
    }

    private static void getProcessSiblings(List<Integer> listToCollect, Integer pid) {
        listToCollect.add(pid);
        String result = null;

        try {
            InputStream is = Runtime.getRuntime().exec("pgrep -P " + pid).getInputStream();
            result = Streams.asString(is);
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (result == null || result.equals("")) return;

        for (String p : Arrays.asList(result.split("\n"))) {
            if (p.length() > 5 || p.equals("00001") || p.equals("1"))
                throw new RuntimeException("Process id is " + p + " , not going to kill! ");

            listToCollect.add(Integer.valueOf(p));

        }
    }

    public static long getThreadId() {
        return Thread.currentThread().getId();
    }

    public static void killProcessById(Integer pid) {
        try {
            execute("kill -9 " + pid);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("CANT KILL PROCESS WITH ID " + pid);
        }
    }

    public static Process execute(String command) throws IOException {
        return Runtime.getRuntime().exec(command);
    }

    public static Process execute(String[] cmdarray, @Nullable String[] envp, File dir) throws IOException {
        return Runtime.getRuntime().exec(cmdarray, envp, dir);
    }

    public static void logProcess(Process process, File file) throws IOException {

        Files.copy(process.getInputStream(), Paths.get(file.toURI()), StandardCopyOption.REPLACE_EXISTING);

        Files.lines(file.toPath()).forEach(System.out::println); //todo remove
    }

    public static List<Integer> getPIDsOfAllJobProcesses(Job job) {
        int mainProcessPid = ProcessHelper.getPidOfProcess(job.getProcess());

        List<Integer> PIDs = ProcessHelper.getPidDescendantTree(mainProcessPid);
        job.setProcessTree(PIDs);

        if (PIDs.size() > 7) throw new RuntimeException("Tree is too big");
        return PIDs;
    }
}
