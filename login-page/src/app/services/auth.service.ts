import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/login-response.type';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private apiUrl: string = "http://localhost:8080/auth"; 
  private loggedIn: BehaviorSubject<boolean>; 

  constructor(private httpClient: HttpClient, private router: Router) { 
    this.loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated()); 
  }

  authenticate(login: string, password: string) { 
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { login, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token); 
        sessionStorage.setItem("login", value.login); 
        this.router.navigate(['/home']); 
      })
    );
  }

  signup(name: string, email: string, login: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { name, email, login, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.login) 
      })
    );
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('auth-token');
  }
  
  getLoggedInStatus(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(token: string): void {
    sessionStorage.setItem('auth-token', token);
    this.loggedIn.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('login');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}