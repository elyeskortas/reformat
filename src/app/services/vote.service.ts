import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private baseUrl = 'https://127.0.0.1:8000/api/votes';

  constructor(private http: HttpClient) { }

  getAllVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(this.baseUrl);
  }

  addVote(vote: Vote): Observable<any> {
    return this.http.post(this.baseUrl, vote);
  }

  cancelVote(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}/cancel`;
    return this.http.delete<void>(url);
  }

  validateVote(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}/validate`;
    return this.http.put<void>(url, null);
  }

  // Ajoutez d'autres méthodes de service pour mettre à jour, supprimer et récupérer les votes selon vos besoins
}
