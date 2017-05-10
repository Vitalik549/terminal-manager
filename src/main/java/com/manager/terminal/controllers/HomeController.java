package com.manager.terminal.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    // public String index (@RequestParam(value = "name", required = false, defaultValue = "World") String name, Model model) {
    //  model.add(name, "val")

    @RequestMapping("/")
    public String index () {
        return "index";
    }

    @RequestMapping("test")
    public String test () {
        return "test";
    }


}