import { Component, OnInit } from '@angular/core';
import { DataHoraService } from '../../services/data-hora.service';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer-layout',
  standalone: true,
  imports: [],
  templateUrl: './footer-layout.component.html',
  styleUrl: './footer-layout.component.scss'
})
export class FooterLayoutComponent implements OnInit{
  currentDateTime: string = '';

  constructor(private dataHoraService: DataHoraService) { }

  ngOnInit(): void {

    console.log("Entrou no footer")
    // Atualiza a cada segundo
    interval(1000).pipe(
      map(() => this.dataHoraService.getCurrentDateTimeFormatted())
    ).subscribe(dateTime => {
      this.currentDateTime = dateTime;
    });
  }
}