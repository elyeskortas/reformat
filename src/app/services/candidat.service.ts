import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Ajoutez HttpHeaders
import { Observable } from 'rxjs';
import { Candidat } from '../models/candidat.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private baseUrl = 'https://127.0.0.1:8000/api/candidats';

  constructor(private http: HttpClient) { }

  getAllCandidats(): Observable<Candidat[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Candidat[]>(`${this.baseUrl}`, { headers });
  }

  getTotalCandidats(): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<number>(`${this.baseUrl}/count`, { headers });
  }
}
