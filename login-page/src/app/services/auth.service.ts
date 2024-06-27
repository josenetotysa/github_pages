import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/login-response.type';
import { BehaviorSubject, interval, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private apiUrl: string = "http://localhost:8080/auth"; 
  private loggedIn: BehaviorSubject<boolean>; 
  private tokenExpirationCheckInterval = 10000; // 1 minute in milliseconds
  private tokenExpirationThreshold = 40000; // 5 minutes in milliseconds

  constructor(private httpClient: HttpClient, private router: Router, private toastService: ToastrService) { 
    
    this.loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated()); 
    console.log('Entrou no construtor');
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
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { fullname, email, username, password }).pipe(
      tap((value) => {
        // sessionStorage.setItem("auth-token", value.token)
      })
    );
  }

  isAuthenticated(): boolean {
    // Verificar se o token está presente no sessionStorage
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
    sessionStorage.removeItem('username');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


  private startTokenExpirationCheck(): void {
    console.log('Iniciando verificação de expiração do token');
  
    interval(this.tokenExpirationCheckInterval).pipe(
     
      tap(() => {
        console.log('Entrou no intervalo');
        const token = sessionStorage.getItem('auth-token');
        if (token) {
          const expirationDate = this.getTokenExpirationDate(token);
          const currentTime = new Date().getTime();
          const timeToExpiration = expirationDate.getTime() - currentTime;
  
          if (timeToExpiration <= 0) {
            console.log('Token expirado. Realizando logout automático.');
            this.logout();
          } else if (timeToExpiration < this.tokenExpirationThreshold) {
            console.log('Token está próximo da expiração.');
            this.notifyTokenExpiration();
          }
        }
      })
    ).subscribe();
  }
  
  private notifyTokenExpiration(): void {
    // Notifica o usuário sobre a proximidade da expiração do token
    this.toastService.info('Você será deslogado em breve.', 'Token está prestes a expirar.');
  }
  
  private getTokenExpirationDate(token: string): Date {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return new Date(decodedToken.exp * 1000);
  }
}
