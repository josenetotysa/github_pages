import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/login-response.type';
import { BehaviorSubject, Subject, catchError, interval, of, switchMap, takeUntil, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TokenValidationResponse } from '../types/token-validation-response.type'; // Importe o tipo
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private apiUrl: string = "http://localhost:8080/auth"; 
  private loggedIn: BehaviorSubject<boolean>; 
  private tokenExpirationCheckInterval = 300000; // 5 minutos
  private stopChecking = new Subject<void>();

  constructor(private httpClient: HttpClient, private router: Router, private toastService: ToastrService) { 
    
    this.loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
    this.startTokenExpirationCheck();
  }

  authenticate(username: string, password: string) { 
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token); 
        sessionStorage.setItem("fullname", value.fullname); 
        this.router.navigate(['/home']); 
        this.loggedIn.next(true);
      })
    );
  }

  signup(fullname: string, email: string, username: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { fullname, email, username, password });
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
    sessionStorage.removeItem('fullname');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.stopChecking.next(); 
  }

  private startTokenExpirationCheck(): void {
    interval(this.tokenExpirationCheckInterval).pipe(
      takeUntil(this.stopChecking),
      switchMap(() => {
        const token = sessionStorage.getItem('auth-token');
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.httpClient.get<TokenValidationResponse>(`${this.apiUrl}/check-token`, { headers }).pipe(
            catchError((error) => {
              console.error('Check token error:', error);
              return of({ status: 'error' });
            })
          );
        }
        return of({ status: 'no-token' });
      }),
      tap((response: TokenValidationResponse) => {
        switch (response.status) {
          case 'error':
            this.logout();
            break;
          case 'about to expire':
            this.notifyTokenExpiration();
            break;
          case 'valid':
            break;
          default:
            break;
        }
      })
    ).subscribe();
  }
  private notifyTokenExpiration(): void {
    this.toastService.info('Você será deslogado em breve.', 'Token está prestes a expirar.');
  }

  private getTokenExpirationDate(token: string): Date {
    const decodedToken: any = jwtDecode(token);
    return new Date(decodedToken.exp * 1000);
  }

  getCurrentUser(): string | null {
    const token = sessionStorage.getItem('auth-token');
  
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub;
    }
    return null;
  }
}
