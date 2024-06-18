import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obter o token de autenticação do serviço.
    const authToken = sessionStorage.getItem('auth-token');

    // Clonar a requisição e substituir os cabeçalhos originais com
    // cabeçalhos clonados, atualizados com a autorização.
    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    // Enviar a requisição clonada com o cabeçalho para o próximo handler.
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Se uma resposta 401 Unauthorized for recebida, deslogar o usuário
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
