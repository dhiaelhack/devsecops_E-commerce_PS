import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
// 👇 AJOUTE CET IMPORT
import { AddProductComponent } from '../add-product/add-product'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    AddProductComponent // 👇 AJOUTE LE COMPOSANT ICI
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Produits mis à jour');
      },
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Produit supprimé avec succès');
          this.loadProducts();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }
}