package com.example.demo.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // 🔐 Secret JWT fourni via une variable d'environnement
    @Value("${jwt.secret}")
    private String jwtSecret;

    // ⏳ Expiration : 24 heures
    private final int jwtExpirationMs = 86400000;

    private Key key() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    // 🚀 Génère le token en incluant le rôle
    public String generateTokenFromUsername(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
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

    // 🛡️ Extraire le rôle du token
    public String getRoleFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    // ✅ Valider le token envoyé par Angular
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key())
                    .build()
                    .parse(authToken);

            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Erreur JWT : " + e.getMessage());
        }

        return false;
    }
}
