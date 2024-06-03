import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Electeur } from '../models/electeur.model';

@Injectable({
  providedIn: 'root'
})
export class ElecteurService {
  private baseUrl = 'https://127.0.0.1:8000/api/liste-electorale';

  constructor(private http: HttpClient) { }

  getAllElecteurs(): Observable<Electeur[]> {
    // Récupérer le token JWT du stockage local
    const token = localStorage.getItem('token');
    
    // Créer les en-têtes avec le token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Inclure les en-têtes dans la requête HTTP
    return this.http.get<Electeur[]>(`${this.baseUrl}`, { headers });
  }

  getTotalElecteurs(): Observable<number> {
    // Récupérer le token JWT du stockage local
    const token = localStorage.getItem('token');
    
    // Créer les en-têtes avec le token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Inclure les en-têtes dans la requête HTTP
    return this.http.get<number>(`${this.baseUrl}/count`, { headers });
  }
}
