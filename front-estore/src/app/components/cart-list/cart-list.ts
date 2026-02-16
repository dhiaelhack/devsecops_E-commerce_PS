import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css'
})
export class CartList implements OnInit {

  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  cartItems: any[] = [];
  total: number = 0;

  ngOnInit(): void {

    // React instantly to login/logout
    this.authService.currentUser$.subscribe(user => {

      // user logged out → clear cart + redirect
      if (!user) {
        this.cartItems = [];
        this.total = 0;
        this.router.navigate(['/login']);
        return;
      }

      // user logged in → load his cart
      this.chargerPanier();
    });
  }

  chargerPanier(): void {

    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.calculerTotal();
      },
      error: (err) => console.error('Erreur de chargement du panier', err)
    });
  }

  calculerTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + (price * item.quantity);
    }, 0);
  }

  supprimerItem(id: string): void {
    this.cartService.deleteItem(id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.calculerTotal();
      },
      error: (err) => console.error('Erreur lors de la suppression', err)
    });
  }
}
