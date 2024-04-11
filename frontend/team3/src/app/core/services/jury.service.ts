import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Jury } from '../models/jury.model';

@Injectable({
  providedIn: 'root',
})
export class JuryService {
  apiURL = `${environment.apiURL}`;
  constructor(private http: HttpClient) {}

  getAllEntries(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/entries`);
  }

  getJuryDetails(id: number): Observable<any> {
    const url = `${this.apiURL}/entries/${id}`; // Endpoint dla szczegółowych danych zespołu
    return this.http.get<any>(url);
  }

  updateEntrie(status:string,id:number): Observable<any> {
    const payload = { role: status }; 
    return this.http.patch<any>(`${this.apiURL}/entries/${id}`,payload);
  }


}
