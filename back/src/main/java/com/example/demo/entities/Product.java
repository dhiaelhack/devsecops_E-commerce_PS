package com.example.demo.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private double price;
    private String description;
    private String imageUrl;
    private String category;

    // --- GETTERS & SETTERS INDISPENSABLES ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    // 👇 C'EST CETTE MÉTHODE QUE MAVEN RÉCLAME À LA LIGNE 27 ET 34
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}