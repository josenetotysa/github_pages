import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListUsersService } from '../../services/list-users.service';
@Component({
  selector: 'app-menu-dropdown',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './menu-dropdown.component.html',
  styleUrl: './menu-dropdown.component.scss'
})
export class MenuDropdownComponent {

  @ViewChild(ListUsersService) ListUsersService!: ListUsersService;
  listUsers() {
    this.ListUsersService.listUsers();
    }
}
