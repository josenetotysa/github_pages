import { MenuDropdownComponent } from '../menu-dropdown/menu-dropdown.component';
import { CommonModule } from '@angular/common';


import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [MenuDropdownComponent, CommonModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLayoutComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  justifyContentStyle: string = 'center';
  private loginSubscription: Subscription;
  private logoutSubscription: Subscription;

  constructor(private eventService: EventService, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.loginSubscription = new Subscription();
    this.logoutSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated(); // Verificando o status de autenticação inicial

    this.loginSubscription = this.eventService.getLoginEvent().subscribe(() => {
      this.isLoggedIn = true;
      this.updateJustifyContentStyle();
    });

    this.logoutSubscription = this.eventService.getLogoutEvent().subscribe(() => {
      this.isLoggedIn = false;
      this.updateJustifyContentStyle();
    });

    this.updateJustifyContentStyle();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
    this.logoutSubscription.unsubscribe();
  }

  private updateJustifyContentStyle() {
    this.justifyContentStyle = this.isLoggedIn ? 'space-between' : 'center';
    this.cdr.detectChanges();
  }
}