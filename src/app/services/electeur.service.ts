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

  private getToken(): string | null {
    const tokenObject = localStorage.getItem('token');
    if (!tokenObject) {
      console.error('Token JWT non trouvé');
      throw new Error('Token JWT non trouvé');
    }
    const parsedToken = JSON.parse(tokenObject);
    return parsedToken.token; // Assuming the actual token is stored in the 'token' field
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllElecteurs(): Observable<Electeur[]> {
    const headers = this.getHeaders();
    return this.http.get<Electeur[]>(this.baseUrl, { headers });
  }

  getTotalElecteurs(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(this.baseUrl, { headers });
  }
}
