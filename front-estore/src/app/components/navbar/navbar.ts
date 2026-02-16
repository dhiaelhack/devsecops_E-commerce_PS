import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CartService } from '../../services/cart.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService); 
  
  username: string | null = null;
  userRole: string | null = null;
  isDark = false;
  cartCount: number = 0; 

  ngOnInit() {
    this.updateUserStatus();
    this.checkSavedTheme();
    
    // ✅ Écoute le badge en temps réel
    this.cartService.cartCount$.subscribe((count: number) => {
      this.cartCount = count;
    });

    // ✅ TRÈS IMPORTANT : On recharge les infos utilisateur à chaque navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateUserStatus();
    });
  }

  updateUserStatus() {
    const userData = localStorage.getItem('user'); 
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // On s'assure de mapper les champs exactement comme ils sont dans ton localStorage
        this.username = user.username || user.name; 
        this.userRole = user.role; // ✅ Doit être 'ADMIN' pour afficher le bouton
        console.log("Statut utilisateur mis à jour :", this.username, this.userRole);
      } catch (e) {
        this.onLogout();
      }
    } else {
      this.username = null;
      this.userRole = null;
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const theme = this.isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('user-theme', theme);
  }

  checkSavedTheme() {
    const saved = localStorage.getItem('user-theme');
    if (saved === 'dark') {
      this.isDark = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  onLogout() {
    localStorage.removeItem('user'); 
    this.cartService.resetCount(); 
    this.username = null;
    this.userRole = null;
    this.router.navigate(['/login']);
  }
}