import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { FooterLayoutComponent } from '../footer-layout/footer-layout.component';
import { ButtonBlueClickComponent } from '../button-blue-click/button-blue-click.component';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    ButtonBlueClickComponent
  ],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
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

  functioncall(e: MouseEvent) {

  }
}
