package com.example.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/") // This corresponds to the "/" in your test
    public String home() {
        return "Spring is here!";
    }
}