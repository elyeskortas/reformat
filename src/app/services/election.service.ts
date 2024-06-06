import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Election } from '../models/election.model';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  private baseUrl = 'https://127.0.0.1:8000/api/elections';

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

  getElections(): Observable<Election[]> {
    const headers = this.getHeaders();
    return this.http.get<Election[]>(this.baseUrl, { headers })
      .pipe(
        tap(elections => console.log('Elections récupérées:', elections))
      );
  }

  getTotalElections(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<{ count: number }>(this.baseUrl, { headers })
      .pipe(map(response => response.count));
  }

  addElection(election: Election): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl, election, { headers });
  }
}
