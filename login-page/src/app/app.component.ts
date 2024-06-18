import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterLayoutComponent } from './components/footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  imports: [
    CommonModule,
     RouterOutlet,
     FooterLayoutComponent,
     HeaderLayoutComponent,
     MatSlideToggleModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ASCAPP';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated();
  }
}
