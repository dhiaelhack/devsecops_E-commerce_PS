import { Component,Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Important
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule], // 👈 Ajoute-le ici
  templateUrl: './add-product.html'
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<void>(); // 👈 Crée l'événement
  newProduct: Product = { name: '', price: 0, description: 'Nouveau produit', category: 'Laptops',imageUrl: '' };

  constructor(private productService: ProductService) {}
saveProduct() {
  this.productService.saveProduct(this.newProduct).subscribe({
    next: (savedProduct) => {
      this.productAdded.emit();
      console.log('Produit enregistré !', savedProduct);
      alert('Produit ajouté avec succès dans MongoDB !');
      // Optionnel : recharger la page pour voir le nouveau produit
      window.location.reload(); 
    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout', err);
      alert('Erreur : vérifie que ton Backend est allumé.');
    }
  });
}
}