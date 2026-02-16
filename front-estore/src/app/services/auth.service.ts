import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8080/api/auth';

  // 🔥 ÉTAT GLOBAL D'AUTHENTIFICATION
  // Le BehaviorSubject permet à toute l'application de savoir en temps réel qui est connecté
  private currentUserSubject = new BehaviorSubject<any>(this.loadUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  private loadUserFromStorage() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        // On stocke l'utilisateur (avec son token et son rôle)
        localStorage.setItem('currentUser', JSON.stringify(user));
        // On notifie immédiatement tous les composants (comme le ProductShop)
        this.currentUserSubject.next(user); 
      })
    );
  }

  logout(): void {
    // On nettoie le stockage local
    localStorage.removeItem('currentUser');
    // On envoie 'null' pour que les boutons "Ajouter au panier" disparaissent instantanément
    this.currentUserSubject.next(null); 
    this.router.navigate(['/login']);
  }

  getUsername(): string | null {
    return this.currentUserSubject.value?.username || null;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value != null;
  }

  /**
   * ✅ RÉSOLUTION TS2339
   * Cette méthode est indispensable pour ton AuthGuard.
   * Elle permet à Spring Boot et Angular de valider les accès (User vs Admin).
   */
  getUserRole(): string {
    return this.currentUserSubject.value?.role || 'user';
  }
}