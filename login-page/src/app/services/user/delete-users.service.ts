import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ListUsersService } from './list-users.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteUsersService {

  private apiUrl: string = 'http://localhost:8080/user';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  deleteUsers(username: string): Observable<any> {
    const authToken = sessionStorage.getItem('auth-token');

    if (!authToken) {
      // Redirecionar para a página de login se não houver token
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
        // Se o usuário atual estiver deletando a própria conta, deslogar
        if (username === this.authService.getCurrentUser()) {

          this.authService.logout(); // Método de logout que limpa o token e redireciona para /login
        }
      }),
      catchError(error => {
        // Tratar erros de deleção de usuário, se necessário
        console.error('Erro ao deletar usuário:', error);
        return throwError(error);
      })
    );
  }
}