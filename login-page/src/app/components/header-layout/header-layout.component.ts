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
    // console.log('Construtor: Subscrições inicializadas');
  }

  ngOnInit(): void {
    // console.log('ngOnInit: Componente inicializado');
    this.isLoggedIn = this.authService.isAuthenticated(); // Verifica se está autenticado ao inicializar

    // Inscreve-se nos eventos do EventService para login e logout
    this.loginSubscription = this.eventService.getLoginEvent().subscribe(() => {
      // console.log('Evento de Login Recebido');
      this.isLoggedIn = true;
      this.updateJustifyContentStyle();
    });

    this.logoutSubscription = this.eventService.getLogoutEvent().subscribe(() => {
      // console.log('Evento de Logout Recebido');
      this.isLoggedIn = false;
      this.updateJustifyContentStyle();
    });

    this.updateJustifyContentStyle();
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy: Componente destruído');
    this.loginSubscription.unsubscribe();
    this.logoutSubscription.unsubscribe();
    // console.log('Subscrições canceladas');
  }

  private updateJustifyContentStyle() {
    // console.log('updateJustifyContentStyle: Atualizando justifyContentStyle');
    this.justifyContentStyle = this.isLoggedIn ? 'space-between' : 'center';
    // console.log(`justifyContentStyle definido para: ${this.justifyContentStyle}`);
    this.cdr.detectChanges(); // Detecta mudanças explicitamente
    // console.log('Detecção de mudanças acionada');
  }
}