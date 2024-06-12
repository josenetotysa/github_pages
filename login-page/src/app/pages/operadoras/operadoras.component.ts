import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { TitlesComponent } from '../../components/titles/titles.component';

@Component({
  selector: 'app-operadoras',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    TitlesComponent
  ],
  templateUrl: './operadoras.component.html',
  styleUrl: './operadoras.component.scss'
})
export class OperadorasComponent {

}
