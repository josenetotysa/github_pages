import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteUsersService {

  private apiUrl: string = 'http://localhost:8080/login_auth_api/user';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  deleteUsers(username: string): Observable<any> {
    const authToken = sessionStorage.getItem('auth-token');

    if (!authToken) {
      this.router.navigate(['/login']);
      return throwError('Token de autenticação não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      body: { username: username } 
    };


    return this.httpClient.delete<any>(`${this.apiUrl}/delete`, options).pipe(
      tap(() => {
        if (username === this.authService.getCurrentUser()) {

          this.authService.logout(); 
        }
      }),
      catchError(error => {
        console.error('Erro ao deletar usuário:', error);
        return throwError(error);
      })
    );
  }
}