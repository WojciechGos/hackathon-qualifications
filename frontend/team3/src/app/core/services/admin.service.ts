import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiURL = `${environment.apiURL}`; // Dodajemy ścieżkę do endpointu

  constructor(private http: HttpClient) {}

  getAllEntries(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/entries`);
  }

  updateEntrie(UserRole:string,id:number): Observable<any> {
    return this.http.patch<any>(`${this.apiURL}/users/${id}`,UserRole);
  }


}
