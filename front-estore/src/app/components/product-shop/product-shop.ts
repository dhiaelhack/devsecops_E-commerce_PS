import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service'; 
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, delay, of, switchMap, tap } from 'rxjs'; // ✅ Nouveaux imports

@Component({
  selector: 'app-product-shop',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-shop.html',
  styleUrl: './product-shop.css'
})
export class ProductShop implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  products: Product[] = [];
  
  // ✅ Pour gérer l'animation du bouton par produit
  private addingToCartSubject = new BehaviorSubject<string | null>(null);
  addingToCart$ = this.addingToCartSubject.asObservable();


  get isUserConnected(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log("Produits chargés pour le shop :", this.products);
      },
      error: (err) => console.error("Erreur de chargement des produits", err)
    });
  }

  getSafeUrl(url: string | undefined): SafeUrl {
    if (!url) return 'https://via.placeholder.com/180?text=Pas+d+image';
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ajouterAuPanier(produit: Product): void {
    // ✅ Met à jour l'état d'animation pour ce produit
    this.addingToCartSubject.next(produit.id || null);

    this.cartService.ajouterAuPanier(produit).pipe(
      // ✅ Délai pour voir l'animation, puis retire l'état d'animation
      delay(800), 
      tap(() => this.addingToCartSubject.next(null)),
      switchMap(() => of(alert(`${produit.name} ajouté au panier !`))) 
    ).subscribe({
      error: (err) => {
        this.addingToCartSubject.next(null); // S'assurer que l'animation s'arrête en cas d'erreur
        if (err.status === 401 || err.status === 403) {
          alert("Votre session a expiré. Veuillez vous reconnecter.");
          this.authService.logout(); 
          this.router.navigate(['/login']);
        } else {
          console.error("Erreur lors de l'ajout", err);
        }
      }
    });
  }
}