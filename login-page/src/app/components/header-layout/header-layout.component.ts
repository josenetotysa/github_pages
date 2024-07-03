import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MenuDropdownComponent } from '../menu-dropdown/menu-dropdown.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [MenuDropdownComponent, CommonModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HeaderLayoutComponent implements OnInit {
  
  isLoggedIn$: Observable<boolean>; // Inicializa com Observable<boolean>
  isAdmin$: Observable<boolean>; // Inicializa com Observable<boolean>

  constructor(private authService: AuthService) {

    this.isLoggedIn$ = this.authService.getLoggedInStatus();
    this.isAdmin$ = this.authService.isAdmin;

  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.getLoggedInStatus();
    this.isAdmin$ = this.authService.isAdmin;
  }

  get justifyContentStyle(): string {
    return this.authService.isAuthenticated() ? 'space-between' : 'center';
  }
}