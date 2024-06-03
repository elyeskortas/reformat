import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Election } from '../models/election.model';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  private baseUrl = 'https://127.0.0.1:8000/api/elections';

  constructor(private http: HttpClient) { }

  getElections(): Observable<Election[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token JWT non trouvé');
      throw new Error('Token JWT non trouvé');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Election[]>(this.baseUrl, { headers })
      .pipe(
        tap(elections => console.log('Elections récupérées:', elections)) // Ajouter ceci pour loguer les élections
      );
  }

  getTotalElections(): Observable<number> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token JWT non trouvé');
      throw new Error('Token JWT non trouvé');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{count: number}>(`${this.baseUrl}/count`, { headers })
      .pipe(map(response => response.count));
  }
  
  addElection(election: Election): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token JWT non trouvé');
      throw new Error('Token JWT non trouvé');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, election, { headers });
  }
}
