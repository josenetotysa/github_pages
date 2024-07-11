import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import {  Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      // Token existe, decodifica e verifica a role de admin
      const decodedToken: any = jwtDecode(authToken);
      const roles: string[] = decodedToken.roles || [];
      
      if (roles.includes('ROLE_ADMIN')) {
        return true; // Permite o acesso se o usuário é um administrador
      } else {
        // Caso o usuário não seja um administrador, redireciona para uma página de acesso negado ou outra rota
        return this.router.createUrlTree(['/home']);
      }
    } else {
      // Caso não exista token, redireciona para a página de login
      return this.router.createUrlTree(['/login']);
    }
  }
}