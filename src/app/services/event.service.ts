import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'https://127.0.0.1:8000/api/events';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<Event> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Event>(url);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseUrl, event);
  }

  updateEvent(event: Event): Observable<Event> {
    const url = `${this.baseUrl}/${event.id}`;
    return this.http.put<Event>(url, event);
  }

  deleteEvent(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

