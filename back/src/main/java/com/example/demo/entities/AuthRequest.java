package com.example.demo.entities;

/**
 * Ce DTO sert à recevoir les identifiants de connexion
 * envoyés par le Frontend (Angular).
 */
public class AuthRequest {
    private String username;
    private String password;

    // Constructeur vide nécessaire pour la désérialisation JSON
    public AuthRequest() {}

    // Getters et Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}