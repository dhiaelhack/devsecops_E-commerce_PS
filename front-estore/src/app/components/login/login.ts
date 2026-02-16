import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], 
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = { username: '', password: '' };
  
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (user) => {
        console.log('Connexion réussie !');
        
        // 1. On enregistre l'utilisateur (admin ou user) dans le localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // 2. On choisit la destination selon le rôle
        const targetRoute = user.role === 'ADMIN' ? '/admin' : '/shop';
        
        // 3. On redirige et on rafraîchit pour mettre à jour la Navbar
        this.router.navigate([targetRoute]).then(() => {
          window.location.reload(); 
        });
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        alert('Identifiants incorrects.');
      }
    });
  }
} // <--- TOUT ton code doit être AVANT cette accolade de fin