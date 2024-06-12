import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { TitlesComponent } from '../../components/titles/titles.component';

@Component({
  selector: 'app-portabilidade',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    TitlesComponent
  ],
  templateUrl: './portabilidade.component.html',
  styleUrl: './portabilidade.component.scss'
})
export class PortabilidadeComponent {

}
