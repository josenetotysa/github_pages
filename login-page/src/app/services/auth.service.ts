import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/login-response.type';
import { BehaviorSubject, Observable, Subject, catchError, interval, of, switchMap, takeUntil, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TokenValidationResponse } from '../types/token-validation-response.type';
import { jwtDecode } from 'jwt-decode';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "http://localhost:8080/auth";
  private loggedIn: BehaviorSubject<boolean>;
  private tokenExpirationCheckInterval = 300000; // 5 minutos
  private stopChecking = new Subject<void>();
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private httpClient: HttpClient, private router: Router, private toastService: ToastrService, private eventService: EventService) {
    this.loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
    this.startTokenExpirationCheck();
    this.checkAdminRole();
  }

  authenticate(username: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("fullname", value.fullname);
        this.router.navigate(['/home']);
        this.loggedIn.next(true);
        this.checkAdminRole();
        this.eventService.emitLoginEvent();

          // Emitir evento de recarregar página se o usuário for admin
          if (this.isAdminSubject.value) {
            this.eventService.emitReloadPageEvent();
          }
      })
    );
  }

  signup(fullname: string, email: string, username: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { fullname, email, username, password });
  }

  isAuthenticated(): boolean {
    const isAuthenticated = !!sessionStorage.getItem('auth-token');
    return isAuthenticated;
  }

  logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('fullname');
    this.loggedIn.next(false);
    this.isAdminSubject.next(false);
    this.router.navigate(['/login']);
    this.stopChecking.next();
    this.eventService.emitLogoutEvent();
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

  private decodeAuthToken(token: string): any {
    return jwtDecode(token);
  }

  private hasAdminRole(token: string): boolean {
    const decodedToken: any = this.decodeAuthToken(token);
    const roles: string[] = decodedToken.roles || [];
    return roles.includes('ROLE_ADMIN');
  }

  private checkAdminRole(): void {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      const isAdmin = this.hasAdminRole(token);
  
      this.isAdminSubject.next(isAdmin);

      console.log(`CheckAdmin = dentro do authserivce isAdmin: ${isAdmin}`);
      console.log(`CheckAdmin = dentro do authserivce isAdminSubject: ${this.isAdminSubject.value}`);
      this.eventService.emitAdminChangeEvent(isAdmin);
  
      
    } else {
      console.log(`CheckAdmin = caso não seja isAdmin: ${this.isAdminSubject.value}`);
      console.log(`CheckAdmin = caso não seja isAdminSubject: ${this.isAdminSubject.value}`);
      this.isAdminSubject.next(false);
      this.eventService.emitAdminChangeEvent(false);
    }
  }

  get isAdmin(): BehaviorSubject<boolean> {
       return this.isAdminSubject;
  }

  isAdminUser(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }
}