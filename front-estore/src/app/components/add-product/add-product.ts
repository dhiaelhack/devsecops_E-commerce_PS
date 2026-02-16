import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Pour le *ngIf
import { HttpClient } from '@angular/common/http'; // 👈 Nécessaire pour l'upload
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './add-product.html'
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<void>();
  
  // Injection moderne avec inject()
  private http = inject(HttpClient);
  private productService = inject(ProductService);

  newProduct: Product = { 
    name: '', 
    price: 0, 
    description: 'Nouveau produit', 
    category: 'Laptops', 
    imageUrl: '' 
  };

  isUploading = false; // Pour gérer l'état du bouton

  // 👇 ÉTAPE 1 : L'admin choisit un fichier sur son PC
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append("file", file);

      // On envoie le fichier vers ton nouveau contrôleur Spring Boot
      this.http.post('http://localhost:8080/api/products/upload', formData, { responseType: 'text' })
        .subscribe({
          next: (urlGeneree) => {
            // Le backend renvoie l'URL : http://localhost:8080/api/products/images/nom_image.png
            this.newProduct.imageUrl = urlGeneree; 
            this.isUploading = false;
            console.log('Image uploadée ! URL :', urlGeneree);
          },
          error: (err) => {
            console.error("Erreur d'upload", err);
            this.isUploading = false;
            alert("L'upload a échoué. Vérifie ton dossier 'uploads' au backend.");
          }
        });
    }
  }

  // 👇 ÉTAPE 2 : On enregistre le tout dans MongoDB
  saveProduct() {
    if (!this.newProduct.imageUrl) {
      alert("Attend la fin de l'upload ou sélectionne une image !");
      return;
    }

    this.productService.saveProduct(this.newProduct).subscribe({
      next: (savedProduct) => {
        this.productAdded.emit();
        console.log('Produit enregistré !', savedProduct);
        alert('Produit ajouté avec succès avec son image locale !');
        
        // Reset du formulaire au lieu de reload la page (plus propre)
        this.newProduct = { name: '', price: 0, description: 'Nouveau produit', category: 'Laptops', imageUrl: '' };
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout', err);
        alert('Erreur : vérifie ton Backend.');
      }
    });
  }
}