package com.example.demo.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority; // ✅ Import indispensable
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;
        String role = null;

        // 1. Extraction du Token
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            if (jwtUtils.validateJwtToken(token)) {
                username = jwtUtils.getUserNameFromJwtToken(token);
                role = jwtUtils.getRoleFromJwtToken(token); // ✅ On récupère le rôle du JWT
            }
        }

        // 2. Authentification avec Rôles
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // ✅ On transforme le string "ADMIN" en autorité Spring Security
            List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    username, null, authorities // ✅ On passe les autorités ici
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }
}