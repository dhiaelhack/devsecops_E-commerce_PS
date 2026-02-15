package com.example.demo;

import com.example.demo.entities.Product;
import com.example.demo.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration; // 👈 AJOUTE CET IMPORT
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class }) // 👈 MODIFIE CETTE LIGNE
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner start(ProductRepository productRepository) {
		return args -> {
			// On nettoie la base pour éviter les doublons au redémarrage
			productRepository.deleteAll();

			Product p1 = new Product();
			p1.setName("Laptop Dell G15");
			p1.setPrice(1200.50);
			p1.setCategory("Laptops"); // 👈 Catégorie 1
			p1.setDescription("Gamer Edition 2026");
			productRepository.save(p1);

			Product p2 = new Product();
			p2.setName("Souris Logitech G502");
			p2.setPrice(59.99);
			p2.setCategory("Accessoires"); // 👈 Catégorie 2
			p2.setDescription("Capteur HERO 25K");
			productRepository.save(p2);

			productRepository.save(p1);

			System.out.println("-----------------------------------------");
			System.out.println("=> PRODUIT INSÉRÉ ET SERVEUR ACTIF SUR LE PORT 8080");
			System.out.println("-----------------------------------------");
		};
	}
}