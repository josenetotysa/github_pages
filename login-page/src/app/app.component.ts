import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterLayoutComponent } from './components/footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
     RouterOutlet,
     FooterLayoutComponent,
     HeaderLayoutComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'ASCAPP';
}
