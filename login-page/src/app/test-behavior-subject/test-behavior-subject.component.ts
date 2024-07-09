import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-test-behavior-subject',
  standalone: true,
  imports: [],
  templateUrl: './test-behavior-subject.component.html',
  styleUrl: './test-behavior-subject.component.scss'
})
export class TestBehaviorSubject {
  private isAdminSubject: BehaviorSubject<boolean>;

  constructor(private eventService: EventService) {
    this.isAdminSubject = new BehaviorSubject<boolean>(false);

    // Inscreve-se no adminChangeEvent para atualizar o estado de isAdminSubject
    this.eventService.getAdminChangeEvent().subscribe(isAdmin => {
      console.log(`Novo estado de admin recebido: ${isAdmin}`);
      this.isAdminSubject.next(isAdmin);
    });
  }

  // Método para obter o Observable do estado de isAdmin
  getIsAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }
}