import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // 👈 Ajout de RouterLink
import { Navbar } from './components/navbar/navbar'; 
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, // 👈 Indispensable pour naviguer entre Shop et Admin
    Navbar ,
    Footer    // On garde la Navbar car elle est visible partout
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-estore');
}