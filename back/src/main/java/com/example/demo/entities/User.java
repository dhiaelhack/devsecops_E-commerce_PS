package com.example.demo.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient; // 👈 Import important
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String role;

    // ✅ AJOUT DU CHAMP TOKEN
    // @Transient empêche Spring de stocker le token dans MongoDB
    @Transient
    private String token;

    // --- CONSTRUCTEURS ---
    public User() {}

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // --- GETTERS ET SETTERS ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    // ✅ NOUVEAUX GETTER ET SETTER POUR LE TOKEN
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}