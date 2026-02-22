import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://172.17.0.1:8080/api/cart';

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    this.initialiserCompteur();
  }

  initialiserCompteur() {
    this.getCart().subscribe({
      next: (items: any[]) => {
        const count = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
        this.cartCount.next(count);
      },
      error: () => this.cartCount.next(0)
    });
  }

  ajouterAuPanier(product: Product): Observable<any> {
    return this.http.post(`${this.API_URL}/add`, {
      product: product,
      quantity: 1
    }).pipe(
      tap(() => {
        this.cartCount.next(this.cartCount.value + 1);
      })
    );
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/items`);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`).pipe(
      tap(() => {
        if (this.cartCount.value > 0) {
          this.cartCount.next(this.cartCount.value - 1);
        }
      })
    );
  }

  resetCount() {
    this.cartCount.next(0);
  }
}