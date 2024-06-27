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

  fullname: string = "";
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const fullname = sessionStorage.getItem("fullname");
      if (fullname) {
        this.fullname = fullname;
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
