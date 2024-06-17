import { Component, Input, OnInit } from '@angular/core';
import { MenuDropdownComponent } from '../menu-dropdown/menu-dropdown.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [MenuDropdownComponent, CommonModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss'
})
export class HeaderLayoutComponent {
  

  constructor(private authService: AuthService) {}

  get justifyContentStyle(): string {
    return this.authService.isAuthenticated() ? 'space-between' : 'center';
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated() ? true : false;
  }

}

