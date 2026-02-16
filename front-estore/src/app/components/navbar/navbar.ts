import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html'
})
export class Navbar implements OnInit {
  private router = inject(Router);
  username: string | null = null;
  userRole: string | null = null;
  
  // ✅ État du thème
  isDark = false;

  ngOnInit() {
    this.updateUserStatus();
    this.checkSavedTheme(); // ✅ Vérifie le thème au démarrage
    
    // On vérifie l'état à chaque changement de page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.updateUserStatus());
  }

  // ✅ Logique de changement de thème
  toggleTheme() {
    this.isDark = !this.isDark;
    const theme = this.isDark ? 'dark' : 'light';
    
    // On applique le thème sur la balise <html> pour le CSS global
    document.documentElement.setAttribute('data-theme', theme);
    
    // Sauvegarde pour ne pas perdre le thème au refresh
    localStorage.setItem('user-theme', theme);
  }

  checkSavedTheme() {
    const saved = localStorage.getItem('user-theme');
    if (saved === 'dark') {
      this.isDark = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  updateUserStatus() {
    // ✅ Utilise 'user' pour être raccord avec l'intercepteur
    const userData = localStorage.getItem('user'); 
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.username = user.username;
        this.userRole = user.role;
      } catch (e) {
        console.error("Erreur lors de la lecture des données utilisateur", e);
        this.onLogout();
      }
    } else {
      this.username = null;
      this.userRole = null;
    }
  }

  onLogout() {
    // ✅ Nettoie tout proprement (Token + Username + Role)
    localStorage.removeItem('user'); 
    this.username = null;
    this.userRole = null;
    this.router.navigate(['/login']);
  }
}