package com.example.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // This MUST be @RestController to return raw strings
public class RootController {

    @GetMapping("/")
    public String home() {
        return "Spring is here!";
    }
}