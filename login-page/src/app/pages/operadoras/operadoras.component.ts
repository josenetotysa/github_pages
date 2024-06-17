import { Component, ViewChild, inject } from '@angular/core';
import { TitlesComponent } from '../../components/titles/titles.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalOperadorasComponent } from './modal-operadoras/modal-operadoras.component';

export interface PhoneNumber {
  rn1: number;
  operadora: string;
  rn2: number;
  rel: number;
}

const mocks: PhoneNumber[] = [
  { rn1: 12345, operadora: "Vivo", rn2: 67890, rel: 10 },
  { rn1: 54321, operadora: "Claro", rn2: 98765, rel: 20 },
  { rn1: 67890, operadora: "Tim", rn2: 12345, rel: 15 },
  { rn1: 98765, operadora: "Oi", rn2: 54321, rel: 25 },
  { rn1: 24680, operadora: "Vivo", rn2: 13579, rel: 30 },
  { rn1: 13579, operadora: "Claro", rn2: 24680, rel: 35 },
  { rn1: 19283, operadora: "Tim", rn2: 56472, rel: 40 },
  { rn1: 56472, operadora: "Oi", rn2: 19283, rel: 45 },
  { rn1: 31415, operadora: "Vivo", rn2: 27182, rel: 50 },
  { rn1: 27182, operadora: "Claro", rn2: 31415, rel: 55 },
  { rn1: 38475, operadora: "Tim", rn2: 91827, rel: 60 },
  { rn1: 91827, operadora: "Oi", rn2: 38475, rel: 65 },
  { rn1: 72645, operadora: "Vivo", rn2: 19284, rel: 70 },
  { rn1: 19284, operadora: "Claro", rn2: 72645, rel: 75 },
  { rn1: 48573, operadora: "Tim", rn2: 67584, rel: 80 },
  { rn1: 67584, operadora: "Oi", rn2: 48573, rel: 85 },
  { rn1: 39482, operadora: "Vivo", rn2: 18293, rel: 90 },
  { rn1: 18293, operadora: "Claro", rn2: 39482, rel: 95 },
  { rn1: 57483, operadora: "Tim", rn2: 39284, rel: 99 },
  { rn1: 39284, operadora: "Oi", rn2: 57483, rel: 88 },
  { rn1: 29475, operadora: "Vivo", rn2: 98712, rel: 77 },
  { rn1: 98712, operadora: "Claro", rn2: 29475, rel: 66 },
  { rn1: 39482, operadora: "Tim", rn2: 29384, rel: 55 },
  { rn1: 29384, operadora: "Oi", rn2: 39482, rel: 44 },
  { rn1: 17483, operadora: "Vivo", rn2: 98724, rel: 33 },
  { rn1: 98724, operadora: "Claro", rn2: 17483, rel: 22 },
  { rn1: 84729, operadora: "Tim", rn2: 29374, rel: 11 },
  { rn1: 29374, operadora: "Oi", rn2: 84729, rel: 19 },
  { rn1: 84720, operadora: "Vivo", rn2: 10482, rel: 27 },
  { rn1: 10482, operadora: "Claro", rn2: 84720, rel: 34 },
  { rn1: 64728, operadora: "Tim", rn2: 37482, rel: 45 },
  { rn1: 37482, operadora: "Oi", rn2: 64728, rel: 56 },
  { rn1: 84719, operadora: "Vivo", rn2: 27482, rel: 67 },
  { rn1: 27482, operadora: "Claro", rn2: 84719, rel: 78 },
  { rn1: 64720, operadora: "Tim", rn2: 39481, rel: 89 },
  { rn1: 39481, operadora: "Oi", rn2: 64720, rel: 98 },
  { rn1: 37492, operadora: "Vivo", rn2: 84710, rel: 22 },
  { rn1: 84710, operadora: "Claro", rn2: 37492, rel: 34 },
  { rn1: 64729, operadora: "Tim", rn2: 29471, rel: 55 },
  { rn1: 29471, operadora: "Oi", rn2: 64729, rel: 66 }
];


@Component({
  selector: 'app-operadoras',
  standalone: true,
  imports: [
    TitlesComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    CommonModule,
    MatDialogModule 
  ],
  templateUrl: './operadoras.component.html',
  styleUrl: './operadoras.component.scss'
})
export class OperadorasComponent {
  displayedColumns: string[] = ['rn1', 'operadora', 'rn2', 'rel', 'editar'];
  dataSource = new MatTableDataSource<PhoneNumber>(mocks);
  filtroAtivo: 'rn1' | 'operadora' | 'rn2' | 'rel' = 'rn1';
  filtroRn1 = true;
  filtroOperadora = false;
  filtroRn2 = false;
  filtroRel = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialog = inject(MatDialog);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(column: string, event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim();

    switch (column) {
      case 'rn1':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.rn1.toString().includes(filter);
        break;
      case 'operadora':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.operadora.toString().includes(filter);
        break;
      case 'rn2':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.rn2.toString().includes(filter);
        break;
      case 'rel':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.rel.toString().includes(filter);
        break;
      default:
        break;
    }

    this.dataSource.filter = filtro;
  }

  toggleFiltro(filtro: 'rn1' | 'operadora' | 'rn2' | 'rel') {
    this.filtroAtivo = filtro;
    this.filtroRn1 = filtro === 'rn1';
    this.filtroOperadora = filtro === 'operadora';
    this.filtroRn2 = filtro === 'rn2';
    this.filtroRel = filtro === 'rel';
  }


  openDialog(element: any): void {
    const dialogRef = this.dialog.open(ModalOperadorasComponent, {
      width: '450px',
      data: { rn1: element.rn1, operadora: element.operadora, rn2: element.rn2, rel: element.rel }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.rn1 = result.rn1;
        element.operadora = result.operadora;
        element.rn2 = result.rn2;
        element.rel = result.rel;
      }
    });
  }
}