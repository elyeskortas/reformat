import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://127.0.0.1:8000';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    
    return this.http.post<{success:  string}>(`${this.apiUrl}/login`, { email, password }).pipe(
      
      tap(
        response => {
        console.log('Full login response:', response); // Log the full response for debugging
        
        if (response && response.success) 
          {
          localStorage.setItem(this.tokenKey, JSON.stringify(response.success));
          console.log('Token saved:', response.success); // Confirm the token is saved
        }
        return response;
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot_password`, { email });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    console.log('Token in storage:', token); // Log for debugging
    return !!token;
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Modifier les requêtes HTTP pour inclure le jeton JWT
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  // Modifier les requêtes pour inclure les en-têtes d'autorisation
  getAllElecteurs(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/api/liste-electorale`, { headers });
  }
}
