import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/cart';

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  /**
   * Ajoute un produit au panier
   * On envoie l'objet 'product' complet car le Backend utilise @DBRef
   */
  ajouterAuPanier(product: Product): Observable<any> {
    return this.http.post(`${this.API_URL}/add`, {
      product: product, // Correspond au champ 'private Product product' en Java
      quantity: 1
    }).pipe(
      tap(() => this.cartCount.next(this.cartCount.value + 1))
    );
  }

  /**
   * Récupère le panier de l'utilisateur connecté
   * ✅ URL corrigée : /items pour correspondre au @GetMapping du Controller
   */
  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/items`);
  }

  /**
   * Supprime un article du panier
   */
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`).pipe(
      tap(() => {
        if (this.cartCount.value > 0) {
          this.cartCount.next(this.cartCount.value - 1);
        }
      })
    );
  }
}