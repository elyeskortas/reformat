import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://your-api-url.com/admins';

  constructor(private http: HttpClient) { }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, admin);
  }

  updateAdmin(admin: Admin): Observable<Admin> {
    const url = `${this.apiUrl}/${admin.id}`;
    return this.http.put<Admin>(url, admin);
  }

  deleteAdmin(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
