import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 👈 Import crucial pour ton Dell G15

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Gère les performances
    provideRouter(routes),
    provideHttpClient() // 👈 Autorise les appels vers http://localhost:8080
  ]
};