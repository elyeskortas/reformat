import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from '../models/candidat.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private baseUrl = 'https://127.0.0.1:8000/api/candidats';

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

  getAllCandidats(): Observable<Candidat[]> {
    const headers = this.getHeaders();
    return this.http.get<Candidat[]>(this.baseUrl, { headers });
  }

  getTotalCandidats(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(this.baseUrl, { headers });
  }
}
