import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-shop.html',
  styleUrl: './product-shop.css'
})
export class ProductShop implements OnInit {
  private productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => { 
        this.products = data; 
      },
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  // 👇 AJOUTE CETTE MÉTHODE ICI POUR RÉPARER L'ERREUR
  addToCart(product: Product): void {
    console.log('Produit ajouté au panier :', product.name);
    alert(`${product.name} a été ajouté au panier !`);
  }
}
