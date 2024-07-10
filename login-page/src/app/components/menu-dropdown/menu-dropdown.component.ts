import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
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
  isAdminMenu: boolean = false;
  private adminChangeEventSubscription: Subscription | null = null;

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.adminChangeEventSubscription = this.eventService.getAdminChangeEvent().subscribe((isAdmin) => {
      this.isAdminMenu = isAdmin;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.adminChangeEventSubscription) {
      this.adminChangeEventSubscription.unsubscribe();
    }
  }
}