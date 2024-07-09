import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private loginSubject: Subject<void> = new Subject<void>();
  private logoutSubject: Subject<void> = new Subject<void>();
  private adminChangeEvent = new Subject<boolean>();
  private reloadPageSubject = new Subject<void>();


  emitLoginEvent(): void {
    this.loginSubject.next();
  }

  emitLogoutEvent(): void {
    this.logoutSubject.next();
  }

  getLoginEvent(): Observable<void> {
    return this.loginSubject.asObservable();
  }

  getLogoutEvent(): Observable<void> {
    return this.logoutSubject.asObservable();
  }

  emitAdminChangeEvent(isAdmin: boolean): void {
    console.log("Foi emitido o evento emitAdminchange")
    setTimeout(() => {
      this.adminChangeEvent.next(isAdmin);
      console.log(`adminChangeEvent foi mudado para: ${isAdmin}`)
    }, 0);
  }

  getAdminChangeEvent() {
    console.log("Foi emitido o evento getAdminChange")
    return this.adminChangeEvent.asObservable();
  }

  emitReloadPageEvent(): void { // Método para emitir evento de recarregar página
    this.reloadPageSubject.next();
  }

  getReloadPageEvent(): Observable<void> { // Método para obter o Observable do evento de recarregar página
    return this.reloadPageSubject.asObservable();
  }

}
