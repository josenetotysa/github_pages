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
  cn: number;
  prefixo: number;
  sufixo: number;
  prefixoT: number;
  sufixoT: number;
}

const phoneNumbers: PhoneNumber[] = [
  { cn: 11, prefixo: 9123, sufixo: 4567, prefixoT: 9123, sufixoT: 4567 },
  { cn: 21, prefixo: 9876, sufixo: 5432, prefixoT: 9123, sufixoT: 4567 },
  { cn: 11, prefixo: 9123, sufixo: 4567, prefixoT: 9123, sufixoT: 4567 }, 
  { cn: 31, prefixo: 8765, sufixo: 4321, prefixoT: 9123, sufixoT: 4567 },
  { cn: 41, prefixo: 7654, sufixo: 3210, prefixoT: 9123, sufixoT: 4567 },
  { cn: 51, prefixo: 6543, sufixo: 2109, prefixoT: 9123, sufixoT: 4567 },
  { cn: 21, prefixo: 9876, sufixo: 5432, prefixoT: 9123, sufixoT: 4567 },  
  { cn: 61, prefixo: 5432, sufixo: 1098, prefixoT: 9123, sufixoT: 4567 },
  { cn: 11, prefixo: 1234, sufixo: 5678, prefixoT: 9123, sufixoT: 4567 },
  { cn: 31, prefixo: 4321, sufixo: 8765, prefixoT: 9123, sufixoT: 4567 },  
  { cn: 32, prefixo: 7654, sufixo: 1098, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 21, prefixo: 4567, sufixo: 8901, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 51, prefixo: 2345, sufixo: 6789, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 41, prefixo: 8901, sufixo: 2345, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 11, prefixo: 5678, sufixo: 9012, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 31, prefixo: 6789, sufixo: 3456, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 21, prefixo: 3456, sufixo: 7890, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 61, prefixo: 7890, sufixo: 1234, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 11, prefixo: 9012, sufixo: 3456, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 11, prefixo: 1111, sufixo: 1111, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 21, prefixo: 2222, sufixo: 2222, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 31, prefixo: 3333, sufixo: 3333, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 41, prefixo: 4444, sufixo: 4444, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 51, prefixo: 5555, sufixo: 5555, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 61, prefixo: 6666, sufixo: 6666, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 71, prefixo: 7777, sufixo: 7777, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 81, prefixo: 8888, sufixo: 8888, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 91, prefixo: 9999, sufixo: 9999, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 12, prefixo: 1234, sufixo: 5678, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 23, prefixo: 2345, sufixo: 6789, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 34, prefixo: 3456, sufixo: 7890, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 45, prefixo: 4567, sufixo: 8901, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 56, prefixo: 5678, sufixo: 9012, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 67, prefixo: 6789, sufixo: 1123, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 78, prefixo: 7890, sufixo: 1234, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 89, prefixo: 8901, sufixo: 2345, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 90, prefixo: 9012, sufixo: 3456, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 99, prefixo: 9876, sufixo: 5432, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 88, prefixo: 8765, sufixo: 4321, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 77, prefixo: 7654, sufixo: 3210, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 66, prefixo: 6543, sufixo: 2109, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 55, prefixo: 5432, sufixo: 1098, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 44, prefixo: 4321, sufixo: 1987, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 33, prefixo: 3210, sufixo: 9876, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 22, prefixo: 2109, sufixo: 8765, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 10, prefixo: 1098, sufixo: 7654, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 91, prefixo: 1987, sufixo: 6543, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 19, prefixo: 9876, sufixo: 5432, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 29, prefixo: 8765, sufixo: 4321, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 39, prefixo: 7654, sufixo: 3210, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 49, prefixo: 6543, sufixo: 2109, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 59, prefixo: 5432, sufixo: 1098, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 69, prefixo: 4321, sufixo: 1987, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 79, prefixo: 3210, sufixo: 9876, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 89, prefixo: 2109, sufixo: 8765, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 99, prefixo: 1098, sufixo: 7654, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 98, prefixo: 1987, sufixo: 6543, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 97, prefixo: 9876, sufixo: 5432, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 96, prefixo: 8765, sufixo: 4321, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 95, prefixo: 7654, sufixo: 3210, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 94, prefixo: 6543, sufixo: 2109, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 93, prefixo: 5432, sufixo: 1098, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 92, prefixo: 4321, sufixo: 1987, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 91, prefixo: 3210, sufixo: 9876, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 90, prefixo: 2109, sufixo: 8765, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 89, prefixo: 1098, sufixo: 7654, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 88, prefixo: 1987, sufixo: 6543, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 87, prefixo: 9876, sufixo: 5432, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 86, prefixo: 8765, sufixo: 4321, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 85, prefixo: 7654, sufixo: 3210, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 84, prefixo: 6543, sufixo: 2109, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 83, prefixo: 5432, sufixo: 1098, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 82, prefixo: 4321, sufixo: 1987, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 81, prefixo: 3210, sufixo: 9876, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 80, prefixo: 2109, sufixo: 8765, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 79, prefixo: 1098, sufixo: 7654, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 78, prefixo: 1987, sufixo: 6543, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 77, prefixo: 9876, sufixo: 5432, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 76, prefixo: 8765, sufixo: 4321, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 75, prefixo: 7654, sufixo: 3210, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 74, prefixo: 6543, sufixo: 2109, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 73, prefixo: 5432, sufixo: 1098, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 72, prefixo: 4321, sufixo: 1987, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 71, prefixo: 3210, sufixo: 9876, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 70, prefixo: 2109, sufixo: 8765, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 69, prefixo: 1098, sufixo: 7654, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 11, prefixo: 1111, sufixo: 1111, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 21, prefixo: 2222, sufixo: 2222, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 31, prefixo: 3333, sufixo: 3333, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 41, prefixo: 4444, sufixo: 4444, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 51, prefixo: 5555, sufixo: 5555, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 61, prefixo: 6666, sufixo: 6666, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 71, prefixo: 7777, sufixo: 7777, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 81, prefixo: 8888, sufixo: 8888, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 91, prefixo: 9999, sufixo: 9999, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 12, prefixo: 1111, sufixo: 1111, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 23, prefixo: 2222, sufixo: 2222, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 34, prefixo: 3333, sufixo: 3333, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 45, prefixo: 4444, sufixo: 4444, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 56, prefixo: 5555, sufixo: 5555, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 67, prefixo: 6666, sufixo: 6666, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 78, prefixo: 7777, sufixo: 7777, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 89, prefixo: 8888, sufixo: 8888, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 90, prefixo: 9999, sufixo: 9999, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 11, prefixo: 1111, sufixo: 1111, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 21, prefixo: 2222, sufixo: 2222, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 31, prefixo: 3333, sufixo: 3333, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 41, prefixo: 4444, sufixo: 4444, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 51, prefixo: 5555, sufixo: 5555, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 61, prefixo: 6666, sufixo: 6666, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 71, prefixo: 7777, sufixo: 7777, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 81, prefixo: 8888, sufixo: 8888, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 91, prefixo: 9999, sufixo: 9999, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 12, prefixo: 1111, sufixo: 1111, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 23, prefixo: 2222, sufixo: 2222, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 34, prefixo: 3333, sufixo: 3333, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 45, prefixo: 4444, sufixo: 4444, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 56, prefixo: 5555, sufixo: 5555, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 67, prefixo: 6666, sufixo: 6666, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 78, prefixo: 7777, sufixo: 7777, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 89, prefixo: 8888, sufixo: 8888, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 90, prefixo: 9999, sufixo: 9999, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 11, prefixo: 1111, sufixo: 1111, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 21, prefixo: 2222, sufixo: 2222, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 31, prefixo: 3333, sufixo: 3333, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 41, prefixo: 4444, sufixo: 4444, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 51, prefixo: 5555, sufixo: 5555, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 61, prefixo: 6666, sufixo: 6666, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 71, prefixo: 7777, sufixo: 7777, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 81, prefixo: 8888, sufixo: 8888, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 91, prefixo: 9999, sufixo: 9999, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 12, prefixo: 1111, sufixo: 1111, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 23, prefixo: 2222, sufixo: 2222, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 34, prefixo: 3333, sufixo: 3333, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 45, prefixo: 4444, sufixo: 4444, prefixoT: 9123, sufixoT: 4567 },   
  { cn: 56, prefixo: 5555, sufixo: 5555, prefixoT: 9123, sufixoT: 4567 }     
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
  displayedColumns: string[] = ['cn', 'prefixo', 'sufixo', 'prefixoT', 'sufixoT' , 'editar'];
  dataSource = new MatTableDataSource<PhoneNumber>(phoneNumbers);
  filtroAtivo: 'cn' | 'prefixo' | 'sufixo' | 'prefixoT' | 'sufixoT' = 'cn';
  filtroCnVisivel = true;
  filtroPrefixoVisivel = false;
  filtroSufixoVisivel = false;
  filtroPrefixoTVisivel = false;
  filtroSufixoTVisivel  = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialog = inject(MatDialog);
  
  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(column: string, event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();

    switch (column) { 
      case 'cn':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.cn.toString().includes(filter);
        break;
      case 'prefixo':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.prefixo.toString().includes(filter);
        break;
      case 'sufixo':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.sufixo.toString().includes(filter);
        break;
      case 'prefixoT':
      this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
        data.prefixoT.toString().includes(filter);
      break;
      case 'sufixoT':
        this.dataSource.filterPredicate = (data: PhoneNumber, filter: string) =>
          data.sufixoT.toString().includes(filter);
        break;
      default:
        break;
    }

    this.dataSource.filter = filtro;
  }

  toggleFiltro(filtro: 'cn' | 'prefixo' | 'sufixo' | 'prefixoT' | 'sufixoT') {
    this.filtroAtivo = filtro;
    this.filtroCnVisivel = filtro === 'cn';
    this.filtroPrefixoVisivel = filtro === 'prefixo';
    this.filtroSufixoVisivel = filtro === 'sufixo';
    this.filtroPrefixoTVisivel = filtro === 'prefixo';
    this.filtroSufixoTVisivel = filtro === 'sufixo';
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(ModalPortabilidadeComponent, {
      width: '600px',
      data: { cn: element.cn, prefixo: element.prefixo, sufixo: element.sufixo, prefixoT: element.prefixoT, sufixoT: element.sufixoT  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.cn = result.cn;
        element.prefixo = result.prefixo;
        element.sufixo = result.sufixo;
        element.prefixoT = result.prefixoT;
        element.sufixoT = result.sufixoT;
      }
    });
  }
}

