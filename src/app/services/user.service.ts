import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://127.0.0.1:8000/api/user'; // Change this to your Symfony API base URL

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

  getUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<{ success: { data: any[] } }>(`${this.baseUrl}/get`, { headers })
      .pipe(
        map(response => response.success.data.map(user => ({
          id: user.ID,
          email: user.Email,
          firstName: user['First Name'],
          lastName: user['Last Name'],
          phoneNumber: user['Phone Number']
        })))
      );
  }

  getUser(id: number): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.baseUrl}/get/${id}`, { headers });
  }

  addUser(userData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/add`, userData, { headers });
  }

  updateUser(id: number, user: Partial<User>): Observable<User> { // Use Partial<User> to allow partial updates
    const headers = this.getHeaders();
    return this.http.put<User>(`${this.baseUrl}/update/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers });
  }
}
