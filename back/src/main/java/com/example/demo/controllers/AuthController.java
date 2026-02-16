package com.example.demo.controllers;

import com.example.demo.config.JwtUtils;
import com.example.demo.entities.AuthRequest;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        // ✅ CORRECTION : Remplacement de isEmpty() par !isPresent() pour la compatibilité Java
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilisateur non trouvé");
        }

        User user = userOpt.get();

        // 🛡️ Comparaison sécurisée (Vérifie bien que tes mots de passe en base sont en clair pour ce test)
        if (user.getPassword().equals(request.getPassword())) {

            // 🔐 GÉNÉRATION DU TOKEN AVEC RÔLE
            // On passe le rôle récupéré de la base de données
            String jwt = jwtUtils.generateTokenFromUsername(user.getUsername(), user.getRole());

            // 📦 On injecte le token dans l'objet user pour Angular
            user.setToken(jwt);

            System.out.println("Login réussi : " + user.getUsername() + " | Rôle : " + user.getRole());

            // On renvoie l'objet complet (Username, Role, Token)
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe incorrect");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Vérification si l'utilisateur existe déjà
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Erreur : Ce nom d'utilisateur existe déjà !");
        }

        // Attribution du rôle USER par défaut pour la sécurité
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}