import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private loginEventSubject = new Subject<void>();
  private logoutEventSubject = new Subject<void>();

  emitLoginEvent() {
    this.loginEventSubject.next();
  }

  getLoginEvent() {
    return this.loginEventSubject.asObservable();
  }

  emitLogoutEvent() {
    this.logoutEventSubject.next();
  }

  getLogoutEvent() {
    return this.logoutEventSubject.asObservable();
  }
}
