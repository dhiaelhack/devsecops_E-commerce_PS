package com.example.demo.controllers;

import com.example.demo.entities.CartItem;
import com.example.demo.repositories.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    /**
     * ✅ Ajoute un article en le liant au nom d'utilisateur du Token
     */
    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem cartItem) {
        // Extraction du nom d'utilisateur depuis le JWT
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        cartItem.setUsername(currentUsername);

        CartItem savedItem = cartItemRepository.save(cartItem);
        System.out.println("Produit ajouté pour : " + currentUsername);
        return ResponseEntity.ok(savedItem);
    }

    /**
     * ✅ Récupère les articles de l'utilisateur connecté
     * Route : /api/cart/items
     */
    @GetMapping("/items")
    public ResponseEntity<List<CartItem>> getMyCart() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        List<CartItem> items = cartItemRepository.findByUsername(currentUsername);
        System.out.println("Récupération du panier de : " + currentUsername + " (" + items.size() + " articles)");

        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable String id) {
        cartItemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}