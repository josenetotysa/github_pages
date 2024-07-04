import { MenuDropdownComponent } from '../menu-dropdown/menu-dropdown.component';
import { CommonModule } from '@angular/common';


import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [MenuDropdownComponent, CommonModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HeaderLayoutComponent implements OnInit{
  
  isLoggedIn: boolean = false;
  justifyContentStyle: string = 'center';
  private loginSubscription: Subscription = new Subscription();
  private logoutSubscription: Subscription = new Subscription();

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loginSubscription = this.eventService.getLoginEvent().subscribe(() => {
      this.onLoginSuccess();
    });

    this.logoutSubscription = this.eventService.getLogoutEvent().subscribe(() => {
      this.onLogout();
    });
  }

  // ngOnDestroy(): void {
  //   this.loginSubscription.unsubscribe();
  //   this.logoutSubscription.unsubscribe();
  // }


  onLoginSuccess() {
    console.log('Usuário logado com sucesso! Executando função no HeaderLayoutComponent...');
    this.isLoggedIn = true;
    this.justifyContentStyle = 'space-between';
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('justifyContentStyle:', this.justifyContentStyle);
    this.cdr.detectChanges(); // Detecta mudanças explicitamente
  }
  
  onLogout() {
    console.log('Usuário deslogado! Executando função no HeaderLayoutComponent...');
    this.isLoggedIn = false;
    this.justifyContentStyle = 'center';
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('justifyContentStyle:', this.justifyContentStyle);
    this.cdr.detectChanges(); // Detecta mudanças explicitamente
  }
}