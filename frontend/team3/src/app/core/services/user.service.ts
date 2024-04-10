import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Team, TeamWithPdf } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = `${environment.apiURL}`;
  constructor(private http: HttpClient) {}

  uploadPdf(pdfFile: File,id: string): Observable<any> {
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    return this.http.post<any>(`${this.apiURL}/storage/${id}`, formData);
  }

  updateTeam(team: Team): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/entries/${team}`, team);
  }

  addTeam(team: Team): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/entries`, team);
  }
}