
import { Routes } from '@angular/router';
import { ProductShop } from './components/product-shop/product-shop';
import { ProductListComponent } from './components/product-list/product-list';

export const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', component: ProductShop },       // Page Shopping (Client)
  { path: 'admin', component: ProductListComponent } // Page Admin (Gestion + Supprimer)
];