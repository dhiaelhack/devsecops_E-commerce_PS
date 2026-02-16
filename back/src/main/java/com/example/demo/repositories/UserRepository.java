package com.example.demo.repositories;

import com.example.demo.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    // Cette méthode magique permet de chercher par nom dans MongoDB
    Optional<User> findByUsername(String username);
}