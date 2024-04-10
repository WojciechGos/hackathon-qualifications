import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = `${environment.apiURL}/`;
  constructor(private http: HttpClient) {}

  addTeam(body: Team): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/add-team`, body, {
      withCredentials: true,
    });
  }
}
