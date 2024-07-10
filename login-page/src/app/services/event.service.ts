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
    setTimeout(() => {
      this.adminChangeEvent.next(isAdmin);
    }, 0);
  }

  getAdminChangeEvent() {
    return this.adminChangeEvent.asObservable();
  }
}
