import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule], // RouterModule pour le lien de retour au login
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // Modèle pour lier les champs du formulaire
  userModel = {
    username: '',
    password: ''
  };

  private http = inject(HttpClient);
  private router = inject(Router);

  onRegister() {
    // On force le rôle à 'USER' par sécurité pour les nouveaux inscrits
    const newUser = { 
      username: this.userModel.username, 
      password: this.userModel.password, 
      role: 'USER' 
    }; 
    
    this.http.post('http://localhost:8080/api/auth/register', newUser).subscribe({
      next: () => {
        alert('Compte créé avec succès ! Connectez-vous.');
        this.router.navigate(['/login']); // Redirection vers le login après succès
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la création du compte.');
      }
    });
  }
}