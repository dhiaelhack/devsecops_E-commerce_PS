
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. On récupère le rôle de l'utilisateur stocké dans le localStorage
  const userRole = authService.getUserRole();

  // 2. Vérification pour la route 'admin'
  if (route.routeConfig?.path === 'admin') {
    if (userRole === 'ADMIN') {
      return true; // Accès autorisé pour l'admin
    } else {
      alert("Accès refusé : Réservé aux administrateurs");
      router.navigate(['/shop']); // Redirection vers le shop pour les simples users
      return false;
    }
  }

  // 3. Vérification pour la route 'shop' (il faut être au moins connecté)
  if (authService.isLoggedIn()) {
    return true;
  }

  // 4. Si l'utilisateur n'est pas connecté du tout, retour au login
  router.navigate(['/login']);
  return false;
};