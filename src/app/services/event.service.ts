import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'https://127.0.0.1:8000/api/events';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    const tokenObject = localStorage.getItem('token');
    if (!tokenObject) {
      console.error('Token JWT non trouvé');
      throw new Error('Token JWT non trouvé');
    }
    const parsedToken = JSON.parse(tokenObject);
    return parsedToken.token;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllEvents(): Observable<Event[]> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/list`;
    return this.http.get<Event[]>(url, { headers });
  }

  getEventById(id: number): Observable<Event> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Event>(url, { headers });
  }

  createEvent(event: FormData): Observable<Event> {
    const headers = this.getHeaders();
    return this.http.post<Event>(this.baseUrl, event, { headers });
  }

  updateEvent(event: Event): Observable<Event> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${event.id}`;
    return this.http.put<Event>(url, event, { headers });
  }

  deleteEvent(id: number): Observable<void> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }
}
