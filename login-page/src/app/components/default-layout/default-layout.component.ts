import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { FooterLayoutComponent } from '../footer-layout/footer-layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MenuDropdownComponent } from '../menu-dropdown/menu-dropdown.component';


@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MenuDropdownComponent
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  @Input() primaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();


  @Output("navigate") onNavigate = new EventEmitter();
  submit() {
    this.onSubmit.emit();
  }

  navigate() {

    this.onNavigate.emit();
  }
}
