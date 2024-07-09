import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterLayoutComponent } from './components/footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from './services/auth.service';
import { TestBehaviorSubject } from './test-behavior-subject/test-behavior-subject.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [

  ],
  imports: [
    CommonModule,
    RouterOutlet,
    FooterLayoutComponent,
    HeaderLayoutComponent,
    MatSlideToggleModule,
    TestBehaviorSubject
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ASCAPP';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated();
  }
}
