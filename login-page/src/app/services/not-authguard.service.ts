import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'; // Importe o serviço de autenticação


@Injectable({
  providedIn: 'root'
})
export class NotAuthguardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // Se o usuário NÃO estiver autenticado, permita o acesso à rota de login
      return true;
    } else {
      // Se o usuário estiver autenticado, redirecione para a página inicial ou outra página
      this.router.navigate(['/home']);
      return false;
    }
  }
}
