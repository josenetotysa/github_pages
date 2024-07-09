import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EventService } from './event.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private isAdminSubject: BehaviorSubject<boolean>;

  constructor(private eventService: EventService, private router: Router) {
    this.isAdminSubject = new BehaviorSubject<boolean>(false);

     // Assinar o evento de mudança de admin para atualizar isAdminSubject
     this.eventService.getAdminChangeEvent().subscribe(isAdmin => {
      console.log(`Novo estado de admin recebido: ${isAdmin}`);
      this.isAdminSubject.next(isAdmin);
    });
  }

  canActivate(): Observable<boolean> {
    // Use o valor atual de isAdminSubject
    return this.isAdminSubject.pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true; // Retorna true se isAdmin for true
        } else {
          this.router.navigate(['/home']);
          return false; // Retorna false se isAdmin for false
        }
      })
    );
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }
}