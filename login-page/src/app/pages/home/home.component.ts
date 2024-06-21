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

  userName: string = "";
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const userName = sessionStorage.getItem("username");
      if (userName) {
        this.userName = userName;
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
