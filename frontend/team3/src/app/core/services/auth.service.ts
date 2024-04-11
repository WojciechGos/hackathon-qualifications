import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginData, RegisterData, User } from '../models/user.model';

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

  async getTokenfromLocalStorage() {
    const token = await localStorage.getItem('token');

    if (token) {
      this.token$.next(token);
      this.isLogged$.next(true);
    } else {
      this.token$.next(null);
      this.isLogged$.next(false);
      this.userRole$.next(null);
    }

    console.log(token);
  }

  login(body: LoginData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/sign-in`, body).pipe(
      tap((res) => {
        this.isLogged$.next(true);
        this.userRole$.next(res.user.role);
        this.token$.next(res.token);
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.user.id);
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
        localStorage.setItem('id', res.user.id);
      })
    );
  }

  logout() {
    this.isLogged$.next(false);
    this.userRole$.next(null);
    this.token$.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  checkRole(): Observable<any> {
    const id = localStorage.getItem('id');
    return this.http.get<any>(`${this.apiURL}/users/${id}`).pipe(
      tap((res) => {
        this.userRole$.next(res.user.role);
      })
    );
  }
}
