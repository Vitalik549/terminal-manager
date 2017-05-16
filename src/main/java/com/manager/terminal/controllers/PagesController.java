package com.manager.terminal.controllers;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

@Controller
public class PagesController {

    @RequestMapping("/")
    public String index () {
        return "index";
    }

    @RequestMapping("test")
    public String test () {
        return "test";
    }


    @RequestMapping(method= RequestMethod.GET, value="download")
    public void getDownload(HttpServletResponse response) {
        File file = new File("/Users/admin/Desktop/log.txt");
        InputStream myStream = null;
        try {
            myStream = new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        // Set the content type and attachment header.
        response.addHeader("Content-disposition", "attachment;filename=log.txt");
        response.setContentType("txt/plain");

        // Copy the stream to the response's output stream.
        try {
            IOUtils.copy(myStream, response.getOutputStream());
            response.flushBuffer();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}