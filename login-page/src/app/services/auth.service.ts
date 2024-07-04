import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/login-response.type';
import { BehaviorSubject, Subject, catchError, interval, of, switchMap, takeUntil, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TokenValidationResponse } from '../types/token-validation-response.type'; // Importe o tipo
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
      })
    );
  }

  signup(fullname: string, email: string, username: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { fullname, email, username, password});
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('auth-token');
  }

  getLoggedInStatus(): BehaviorSubject<boolean> {
    return this.loggedIn;
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
  
  // checkAdminRole(): boolean {
  //   const token = sessionStorage.getItem('auth-token');
  //   if (token) {
  //     try {
  //       const decodedToken: any = jwtDecode(token);
  //       if (decodedToken && decodedToken.roles) {
  //         const roles: string[] = decodedToken.roles;
  //         return roles.includes('ROLE_ADMIN');
  //       }
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //     }
  //   }
  //   return false;
  // }

  private checkAdminRole(): void {
    const token = sessionStorage.getItem('auth-token');

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const roles: string[] = decodedToken.roles || []; // Modificado para evitar erro

      if (roles.includes('ROLE_ADMIN')) {
        this.isAdminSubject.next(true);
      } else {
        this.isAdminSubject.next(false);
      }
    } else {
      this.isAdminSubject.next(false);
    }
  }



  // Getter para acessar o BehaviorSubject isAdminSubject
  get isAdmin(): BehaviorSubject<boolean> {
    return this.isAdminSubject;
  }
}
