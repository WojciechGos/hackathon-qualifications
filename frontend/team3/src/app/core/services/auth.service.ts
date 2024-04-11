import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginData, RegisterData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = `${environment.apiURL}`;
  constructor(private http: HttpClient) {}

  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userRole$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  login(body: LoginData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/sign-in`, body).pipe(
      tap((res) => {
        this.isLogged$.next(true);
        this.userRole$.next(res.user.role);
      })
    );
  }

  register(body: RegisterData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/sign-up`, body).pipe(
      tap((res) => {
        this.isLogged$.next(true);
        this.userRole$.next(res.user.role);
      })
    );
  }

  logout() {
    this.isLogged$.next(false);
  }

  checkRole(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/sign-in`).pipe(
      tap((res) => {
        this.userRole$.next(res.user.role);
      })
    );
  }
}
