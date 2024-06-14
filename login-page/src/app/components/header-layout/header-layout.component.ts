import { Component, Input } from '@angular/core';
import { MenuDropdownComponent } from '../menu-dropdown/menu-dropdown.component';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [MenuDropdownComponent],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss'
})
export class HeaderLayoutComponent {
  @Input() jsContent: string = "";
}

