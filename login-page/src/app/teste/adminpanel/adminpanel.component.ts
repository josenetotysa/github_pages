import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss'
})
export class AdminpanelComponent {

  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

}
