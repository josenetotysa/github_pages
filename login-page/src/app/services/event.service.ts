import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private loginSubject: Subject<void> = new Subject<void>();
  private logoutSubject: Subject<void> = new Subject<void>();
  private adminChangeSubject: Subject<boolean> = new Subject<boolean>(); // Subject para mudanças de admin

  emitLoginEvent(): void {
    console.log('Emitindo evento de login...');
    this.loginSubject.next();
  }

  emitLogoutEvent(): void {
    console.log('Emitindo evento de logout...');
    this.logoutSubject.next();
  }


  getLoginEvent(): Observable<void> {
    return this.loginSubject.asObservable();
  }

  getLogoutEvent(): Observable<void> {
    return this.logoutSubject.asObservable();
  }

  emitAdminChangeEvent(isAdmin: boolean): void {
    console.log('Emitindo evento de mudança de admin...');
    this.adminChangeSubject.next(isAdmin);
  }

  getAdminChangeEvent(): Observable<boolean> {
    return this.adminChangeSubject.asObservable();
  }

}
