import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  userLogin: string = "";
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const userLogin = sessionStorage.getItem("login");
      console.log(`se liga ${userLogin}`);
      if (userLogin) {
        this.userLogin = userLogin;
      } else {
        console.warn("Nenhum login encontrado no localStorage");
      }
    } else {
      console.warn("Usuário não autenticado");
    }
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
