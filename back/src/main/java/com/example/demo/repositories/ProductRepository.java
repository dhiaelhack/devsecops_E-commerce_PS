package com.example.demo.repositories;

import com.example.demo.entities.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    // Magie : Spring génère automatiquement toutes les méthodes (save, findAll, delete, etc.)
}