package com.example.demo.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "cart_items") // 👈 MongoDB utilise des collections
@Data @NoArgsConstructor @AllArgsConstructor
public class CartItem {
    @Id // 👈 Import de org.springframework.data.annotation.Id
    private String id; // Avec Mongo, on utilise souvent String pour l'ID

    @DBRef // 👈 Pour faire référence à un autre document (ton Produit)
    private Product product;

    private int quantity;
    private String username;
}