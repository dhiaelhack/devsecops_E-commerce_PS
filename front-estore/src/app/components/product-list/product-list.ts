import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart.service'; 
import { Product } from '../../models/product';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AddProductComponent } from '../add-product/add-product'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AddProductComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService); 
  private sanitizer = inject(DomSanitizer);

  products: Product[] = [];
  userRole: string | null = null; // ✅ Pour stocker le rôle de l'utilisateur

  ngOnInit(): void {
    this.checkUserRole(); // ✅ Vérifie le rôle au chargement
    this.loadProducts();
  }

  // ✅ Extrait le rôle de l'objet 'user' stocké
  checkUserRole(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userRole = user.role;
    }
  }

  // ✅ Helper pour le HTML
  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Données chargées avec succès !', this.products);
      },
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }

  getSafeUrl(url: string | undefined): SafeUrl {
    if (!url) return 'https://via.placeholder.com/150?text=Pas+d+image';
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  addToCart(product: Product): void {
    this.cartService.ajouterAuPanier(product).subscribe({
      next: () => alert(`${product.name} ajouté au panier !`),
      error: (err) => console.error(err)
    });
  }

  deleteProduct(id: string | undefined): void {
    if (!id || !confirm('Supprimer ce produit ?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error(err)
    });
  }
}