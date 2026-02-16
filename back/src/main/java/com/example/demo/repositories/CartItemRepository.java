package com.example.demo.repositories;

import com.example.demo.entities.CartItem;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.mongodb.repository.MongoRepository; // 👈 Important
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartItemRepository extends MongoRepository<CartItem, String> { // 👈 String ici car l'ID Mongo est un String
    List<CartItem> findByUsername(String username);
}