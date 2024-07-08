import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-dropdown',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './menu-dropdown.component.html',
  styleUrl: './menu-dropdown.component.scss'
})
export class MenuDropdownComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private adminChangeEventSubscription: Subscription;

  constructor(private authService: AuthService, private eventService: EventService) {
    this.adminChangeEventSubscription = this.eventService.getAdminChangeEvent().subscribe((isAdmin) => {
      console.log(`Recebido evento de mudança de admin! Novo status: ${isAdmin}`);
      this.isAdmin = isAdmin;
    });
  }

  ngOnInit(): void {
    this.checkAdminStatus();
  }

  ngOnDestroy(): void {
    this.adminChangeEventSubscription.unsubscribe();
  }

  private checkAdminStatus(): void {
    this.isAdmin = this.authService.isAdmin.value;
  }
}

// export class MenuDropdownComponent implements OnInit, OnDestroy {
//   isAdmin: boolean = false;
//   private unsubscribe$ = new Subject<void>();
//   private adminChangeSubscription: Subscription; // Defina o tipo Subscription para adminChangeSubscription


//   constructor(private authService: AuthService, private eventService: EventService) {

//     this.adminChangeSubscription = new Subscription;
//   }

//   ngOnInit(): void {
//     console.log("Entrando no ngOnInit do MenuDropdownComponent");

//     // Subscreva-se ao evento de mudança de admin do EventService
//     this.adminChangeSubscription = this.eventService.getAdminChangeEvent().subscribe({
//       next: (isAdmin) => {
//         this.isAdmin = isAdmin;
//         console.log('BATATATATATATATATATATATATATATATATAisAdmin atualizado:', this.isAdmin);
//       },
//       error: (error) => {
//         console.error('Erro ao subscrever evento de mudança de admin:', error);
//       }
//     });

//     // Inicialmente, verifique o estado atual de isAdmin
//     this.authService.isAdmin.pipe(takeUntil(this.unsubscribe$)).subscribe(isAdmin => {
//       this.isAdmin = isAdmin;
//       console.log('isAdmin inicial:', this.isAdmin);
//     });
//   }

//   ngOnDestroy(): void {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//     if (this.adminChangeSubscription) {
//       this.adminChangeSubscription.unsubscribe();
//     }
//   }
//   logout(): void {
//     this.authService.logout();
//   }
// }