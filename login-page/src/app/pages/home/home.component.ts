import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authService: AuthService) {}

  logout(): void {
    // Chama o método logout do AuthService
    this.authService.logout();
    // Aqui você pode redirecionar para a página de login ou para qualquer outra rota desejada
  }

}
