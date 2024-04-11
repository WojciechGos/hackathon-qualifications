import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAllEntries(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiURL}/users`);
  }

  updateRole(newRole: string, userId: number): Observable<any> {
    const payload = { role: newRole }; 
    return this.http.patch<any>(`${this.apiURL}/users/${userId}`, payload);
  }
}
