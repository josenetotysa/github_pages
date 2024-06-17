import { Component, ViewChild, inject } from '@angular/core';
import { TitlesComponent } from '../../components/titles/titles.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalPortabilidadeComponent } from './modal-portabilidade/modal-portabilidade.component';


export interface PhoneNumber {
  ddd: number;
  prefixo: number;
  sufixo: number;
}

const phoneNumbers: PhoneNumber[] = [
  { ddd: 11, prefixo: 9123, sufixo: 4567 },
  { ddd: 21, prefixo: 9876, sufixo: 5432 },
  { ddd: 11, prefixo: 9123, sufixo: 4567 }, 
  { ddd: 31, prefixo: 8765, sufixo: 4321 },
  { ddd: 41, prefixo: 7654, sufixo: 3210 },
  { ddd: 51, prefixo: 6543, sufixo: 2109 },
  { ddd: 21, prefixo: 9876, sufixo: 5432 },  
  { ddd: 61, prefixo: 5432, sufixo: 1098 },
  { ddd: 11, prefixo: 1234, sufixo: 5678 },
  { ddd: 31, prefixo: 4321, sufixo: 8765 },  
  { ddd: 32, prefixo: 7654, sufixo: 1098 },   
  { ddd: 21, prefixo: 4567, sufixo: 8901 },   
  { ddd: 51, prefixo: 2345, sufixo: 6789 },   
  { ddd: 41, prefixo: 8901, sufixo: 2345 },   
  { ddd: 11, prefixo: 5678, sufixo: 9012 },   
  { ddd: 31, prefixo: 6789, sufixo: 3456 },   
  { ddd: 21, prefixo: 3456, sufixo: 7890 },   
  { ddd: 61, prefixo: 7890, sufixo: 1234 },   
  { ddd: 11, prefixo: 9012, sufixo: 3456 },   
  { ddd: 11, prefixo: 1111, sufixo: 1111 },   
  { ddd: 21, prefixo: 2222, sufixo: 2222 },   
  { ddd: 31, prefixo: 3333, sufixo: 3333 },   
  { ddd: 41, prefixo: 4444, sufixo: 4444 },   
  { ddd: 51, prefixo: 5555, sufixo: 5555 },   
  { ddd: 61, prefixo: 6666, sufixo: 6666 },   
  { ddd: 71, prefixo: 7777, sufixo: 7777 },   
  { ddd: 81, prefixo: 8888, sufixo: 8888 },   
  { ddd: 91, prefixo: 9999, sufixo: 9999 },   
  { ddd: 12, prefixo: 1234, sufixo: 5678 },   
  { ddd: 23, prefixo: 2345, sufixo: 6789 },   
  { ddd: 34, prefixo: 3456, sufixo: 7890 },   
  { ddd: 45, prefixo: 4567, sufixo: 8901 },   
  { ddd: 56, prefixo: 5678, sufixo: 9012 },   
  { ddd: 67, prefixo: 6789, sufixo: 1123 },   
  { ddd: 78, prefixo: 7890, sufixo: 1234 },   
  { ddd: 89, prefixo: 8901, sufixo: 2345 },   
  { ddd: 90, prefixo: 9012, sufixo: 3456 },   
  { ddd: 99, prefixo: 9876, sufixo: 5432 },   
  { ddd: 88, prefixo: 8765, sufixo: 4321 },   
  { ddd: 77, prefixo: 7654, sufixo: 3210 },   
  { ddd: 66, prefixo: 6543, sufixo: 2109 },   
  { ddd: 55, prefixo: 5432, sufixo: 1098 },   
  { ddd: 44, prefixo: 4321, sufixo: 1987 },   
  { ddd: 33, prefixo: 3210, sufixo: 9876 },   
  { ddd: 22, prefixo: 2109, sufixo: 8765 },   
  { ddd: 10, prefixo: 1098, sufixo: 7654 },   
  { ddd: 91, prefixo: 1987, sufixo: 6543 },   
  { ddd: 19, prefixo: 9876, sufixo: 5432 },   
  { ddd: 29, prefixo: 8765, sufixo: 4321 },   
  { ddd: 39, prefixo: 7654, sufixo: 3210 },   
  { ddd: 49, prefixo: 6543, sufixo: 2109 },   
  { ddd: 59, prefixo: 5432, sufixo: 1098 },   
  { ddd: 69, prefixo: 4321, sufixo: 1987 },   
  { ddd: 79, prefixo: 3210, sufixo: 9876 },   
  { ddd: 89, prefixo: 2109, sufixo: 8765 },   
  { ddd: 99, prefixo: 1098, sufixo: 7654 },   
  { ddd: 98, prefixo: 1987, sufixo: 6543 },   
  { ddd: 97, prefixo: 9876, sufixo: 5432 },   
  { ddd: 96, prefixo: 8765, sufixo: 4321 },   
  { ddd: 95, prefixo: 7654, sufixo: 3210 },   
  { ddd: 94, prefixo: 6543, sufixo: 2109 },   
  { ddd: 93, prefixo: 5432, sufixo: 1098 },   
  { ddd: 92, prefixo: 4321, sufixo: 1987 },   
  { ddd: 91, prefixo: 3210, sufixo: 9876 },   
  { ddd: 90, prefixo: 2109, sufixo: 8765 },   
  { ddd: 89, prefixo: 1098, sufixo: 7654 },   
  { ddd: 88, prefixo: 1987, sufixo: 6543 },   
  { ddd: 87, prefixo: 9876, sufixo: 5432 },   
  { ddd: 86, prefixo: 8765, sufixo: 4321 },   
  { ddd: 85, prefixo: 7654, sufixo: 3210 },   
  { ddd: 84, prefixo: 6543, sufixo: 2109 },   
  { ddd: 83, prefixo: 5432, sufixo: 1098 },   
  { ddd: 82, prefixo: 4321, sufixo: 1987 },   
  { ddd: 81, prefixo: 3210, sufixo: 9876 },   
  { ddd: 80, prefixo: 2109, sufixo: 8765 },   
  { ddd: 79, prefixo: 1098, sufixo: 7654 },   
  { ddd: 78, prefixo: 1987, sufixo: 6543 },   
  { ddd: 77, prefixo: 9876, sufixo: 5432 },   
  { ddd: 76, prefixo: 8765, sufixo: 4321 },   
  { ddd: 75, prefixo: 7654, sufixo: 3210 },   
  { ddd: 74, prefixo: 6543, sufixo: 2109 },   
  { ddd: 73, prefixo: 5432, sufixo: 1098 },   
  { ddd: 72, prefixo: 4321, sufixo: 1987 },   
  { ddd: 71, prefixo: 3210, sufixo: 9876 },   
  { ddd: 70, prefixo: 2109, sufixo: 8765 },   
  { ddd: 69, prefixo: 1098, sufixo: 7654 },   
  { ddd: 11, prefixo: 1111, sufixo: 1111 },   
  { ddd: 21, prefixo: 2222, sufixo: 2222 },   
  { ddd: 31, prefixo: 3333, sufixo: 3333 },   
  { ddd: 41, prefixo: 4444, sufixo: 4444 },   
  { ddd: 51, prefixo: 5555, sufixo: 5555 },   
  { ddd: 61, prefixo: 6666, sufixo: 6666 },   
  { ddd: 71, prefixo: 7777, sufixo: 7777 },   
  { ddd: 81, prefixo: 8888, sufixo: 8888 },   
  { ddd: 91, prefixo: 9999, sufixo: 9999 },   
  { ddd: 12, prefixo: 1111, sufixo: 1111 },   
  { ddd: 23, prefixo: 2222, sufixo: 2222 },   
  { ddd: 34, prefixo: 3333, sufixo: 3333 },   
  { ddd: 45, prefixo: 4444, sufixo: 4444 },   
  { ddd: 56, prefixo: 5555, sufixo: 5555 },   
  { ddd: 67, prefixo: 6666, sufixo: 6666 },   
  { ddd: 78, prefixo: 7777, sufixo: 7777 },   
  { ddd: 89, prefixo: 8888, sufixo: 8888 },   
  { ddd: 90, prefixo: 9999, sufixo: 9999 },   
  { ddd: 11, prefixo: 1111, sufixo: 1111 },   
  { ddd: 21, prefixo: 2222, sufixo: 2222 },   
  { ddd: 31, prefixo: 3333, sufixo: 3333 },   
  { ddd: 41, prefixo: 4444, sufixo: 4444 },   
  { ddd: 51, prefixo: 5555, sufixo: 5555 },   
  { ddd: 61, prefixo: 6666, sufixo: 6666 },   
  { ddd: 71, prefixo: 7777, sufixo: 7777 },   
  { ddd: 81, prefixo: 8888, sufixo: 8888 },   
  { ddd: 91, prefixo: 9999, sufixo: 9999 },   
  { ddd: 12, prefixo: 1111, sufixo: 1111 },   
  { ddd: 23, prefixo: 2222, sufixo: 2222 },   
  { ddd: 34, prefixo: 3333, sufixo: 3333 },   
  { ddd: 45, prefixo: 4444, sufixo: 4444 },   
  { ddd: 56, prefixo: 5555, sufixo: 5555 },   
  { ddd: 67, prefixo: 6666, sufixo: 6666 },   
  { ddd: 78, prefixo: 7777, sufixo: 7777 },   
  { ddd: 89, prefixo: 8888, sufixo: 8888 },   
  { ddd: 90, prefixo: 9999, sufixo: 9999 },   
  { ddd: 11, prefixo: 1111, sufixo: 1111 },   
  { ddd: 21, prefixo: 2222, sufixo: 2222 },   
  { ddd: 31, prefixo: 3333, sufixo: 3333 },   
  { ddd: 41, prefixo: 4444, sufixo: 4444 },   
  { ddd: 51, prefixo: 5555, sufixo: 5555 },   
  { ddd: 61, prefixo: 6666, sufixo: 6666 },   
  { ddd: 71, prefixo: 7777, sufixo: 7777 },   
  { ddd: 81, prefixo: 8888, sufixo: 8888 },   
  { ddd: 91, prefixo: 9999, sufixo: 9999 },   
  { ddd: 12, prefixo: 1111, sufixo: 1111 },   
  { ddd: 23, prefixo: 2222, sufixo: 2222 },   
  { ddd: 34, prefixo: 3333, sufixo: 3333 },   
  { ddd: 45, prefixo: 4444, sufixo: 4444 },   
  { ddd: 56, prefixo: 5555, sufixo: 5555 }     
];

@Component({
  selector: 'app-portabilidade',
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
  templateUrl: './portabilidade.component.html',
  styleUrl: './portabilidade.component.scss'
})
export class PortabilidadeComponent {
  displayedColumns: string[] = ['ddd', 'prefixo', 'sufixo', 'editar'];
  dataSource = new MatTableDataSource<PhoneNumber>(phoneNumbers);
  filtroAtivo: 'ddd' | 'prefixo' | 'sufixo' = 'ddd';
  filtroDddVisivel = true;
  filtroPrefixoVisivel = false;
  filtroSufixoVisivel = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialog = inject(MatDialog);
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(column: string, event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();

    switch (column) {
      case 'ddd':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.ddd.toString().includes(filter);
        break;
      case 'prefixo':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.prefixo.toString().includes(filter);
        break;
      case 'sufixo':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.sufixo.toString().includes(filter);
        break;
      default:
        break;
    }

    this.dataSource.filter = filtro;
  }

  toggleFiltro(filtro: 'ddd' | 'prefixo' | 'sufixo') {
    this.filtroAtivo = filtro;
    this.filtroDddVisivel = filtro === 'ddd';
    this.filtroPrefixoVisivel = filtro === 'prefixo';
    this.filtroSufixoVisivel = filtro === 'sufixo';
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(ModalPortabilidadeComponent, {
      width: '450px',
      data: { ddd: element.ddd, prefixo: element.prefixo, sufixo: element.sufixo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.ddd = result.ddd;
        element.prefixo = result.prefixo;
        element.sufixo = result.sufixo;
      }
    });
  }
}

