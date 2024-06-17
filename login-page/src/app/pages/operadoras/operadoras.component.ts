import { Component } from '@angular/core';
import { TitlesComponent } from '../../components/titles/titles.component';

@Component({
  selector: 'app-operadoras',
  standalone: true,
  imports: [
    TitlesComponent
  ],
  templateUrl: './operadoras.component.html',
  styleUrl: './operadoras.component.scss'
})
export class OperadorasComponent {

}
