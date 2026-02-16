package com.example.demo.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Définit le chemin vers votre dossier d'images sur le disque dur
        String uploadPath = System.getProperty("user.dir") + "/uploads/";

        // Expose le dossier "uploads" via l'URL http://localhost:8080/api/products/images/
        registry.addResourceHandler("/api/products/images/**")
                .addResourceLocations("file:" + uploadPath);
    }
}