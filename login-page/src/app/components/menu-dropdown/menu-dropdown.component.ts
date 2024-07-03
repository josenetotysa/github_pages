import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
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
export class MenuDropdownComponent {
  @Input() isAdmin: boolean = false; // Adicione a declaração do Input
}