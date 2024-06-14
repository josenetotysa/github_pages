import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterLayoutComponent } from './components/footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
     RouterOutlet,
     FooterLayoutComponent,
     HeaderLayoutComponent,
     HomeComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'login-page';
}
