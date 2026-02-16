import { Routes } from '@angular/router';
import { ProductShop } from './components/product-shop/product-shop';
import { ProductListComponent } from './components/product-list/product-list';
import { Login } from './components/login/login';
import { Register } from './components/register/register'; 
import { authGuard } from './guards/auth-guard';
import { CartList } from './components/cart-list/cart-list';

export const routes: Routes = [
  // La première page affichée est maintenant la boutique !
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', component: ProductShop }, 
  { path: 'cart', component: CartList }, // 👈 Ajoute cette ligne
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'admin', component: ProductListComponent, canActivate: [authGuard] }
];