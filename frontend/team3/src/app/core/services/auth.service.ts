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
  token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );

  getTokenfromLocalStorage() {
    const token = localStorage.getItem('token');

    if (token) {
      this.token$.next(token);
    } else {
      this.token$.next(null);
    }
  }

  login(body: LoginData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/sign-in`, body).pipe(
      tap((res) => {
        this.isLogged$.next(true);
        this.userRole$.next(res.user.role);
        this.token$.next(res.token);
        localStorage.setItem('token', res.token);
      })
    );
  }

  register(body: RegisterData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/sign-up`, body).pipe(
      tap((res) => {
        this.isLogged$.next(true);
        this.userRole$.next(res.user.role);
        this.token$.next(res.token);
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    this.isLogged$.next(false);
    this.userRole$.next(null);
    this.token$.next(null);
    localStorage.removeItem('token');
  }

  checkRole(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/sign-in`).pipe(
      tap((res) => {
        this.userRole$.next(res.user.role);
      })
    );
  }
}
