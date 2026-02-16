package com.example.demo.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // 🔑 Clé secrète (doit rester identique pour signer et valider)
    private final String jwtSecret = "votre_cle_super_secrete_qui_doit_etre_tres_longue_pour_fonctionner_123456789_E_STORE_2026";

    // ⏳ Expiration : 24 heures
    private final int jwtExpirationMs = 86400000;

    private Key key() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // 🚀 MIS À JOUR : Génère le token en incluant le RÔLE
    public String generateTokenFromUsername(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role) // ✅ Ajoute le rôle dans le "Payload" du JWT
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS512)
                .compact();
    }

    // 👤 Extraire le nom d'utilisateur
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 🛡️ NOUVEAU : Extraire le rôle du Token (utilisé par ton JwtAuthenticationFilter)
    public String getRoleFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class); // ✅ Récupère la valeur associée à la clé "role"
    }

    // ✅ Valider le Token envoyé par Angular
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Erreur JWT : " + e.getMessage());
        }
        return false;
    }
}