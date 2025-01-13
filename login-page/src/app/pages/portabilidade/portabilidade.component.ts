import { Component, ViewChild, Injectable, inject } from '@angular/core';
import { TitlesComponent } from '../../components/titles/titles.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalPortabilidadeComponent } from './modal-portabilidade/modal-portabilidade.component';
import { PortabilidadeResponse } from '../../types/portabilidade-response.type';
import { Subscription } from 'rxjs';
import { ListPortabilidadeService } from '../../services/portabilidade/list-portabilidade.service';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Itens por página:';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';

  override getRangeLabel: (page: number, pageSize: number, length: number) => string =
    (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
}

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
  styleUrl: './portabilidade.component.scss',

  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class PortabilidadeComponent {

  displayedColumns: string[] = ['cn', 'prefixo', 'sufixo', 'prefixoMcdu', 'editar'];
  dataSource = new MatTableDataSource<PortabilidadeResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private portabilidadeUpdatedSubscription: Subscription | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private listPortabilidadeService: ListPortabilidadeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadPortabilidade();
    this.subscribeToPortabilidadeUpdated();
  }

  loadPortabilidade() {
    this.listPortabilidadeService.listPortabilidade().subscribe(
      (portabilidade: PortabilidadeResponse[]) => {
        const transformedData = portabilidade.map(item => {
          const realnumber = item.realnumber;
          const virtualnumber = item.virtualnumber;
          return {
            ...item,
            cn: realnumber.substring(0, 2),
            prefixo: realnumber.substring(2, 6),
            sufixo: realnumber.substring(6, 10),

            prefixoMcdu: virtualnumber
          };
        });
        this.dataSource.data = transformedData;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Configurando o filtro para lidar com valores nulos ou indefinidos
    this.dataSource.filterPredicate = (data: PortabilidadeResponse, filter: string) => {
      // Garantir que virtualnumber seja uma string válida
      const virtualnumber = data.virtualnumber || ''; // Tratar virtualnumber como string vazia se for null ou undefined
  
      // Verificar se o filtro corresponde a realnumber ou virtualnumber
      return (
        data.realnumber.includes(filter) || 
        virtualnumber.includes(filter)
      );
    };
  
    // Aplicar o valor do filtro
    this.dataSource.filter = filterValue;
  }

  openDialog(element: PortabilidadeResponse): void {
    const dialogRef = this.dialog.open(ModalPortabilidadeComponent, {
      width: '600px',
      data: { cn: element.cn, prefixo: element.prefixo, sufixo: element.sufixo, prefixoMcdu: element.prefixoMcdu }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.realnumber = result.realnumber;
        element.virtualnumber = result.virtualnumber;
      }
    });
  }

  private subscribeToPortabilidadeUpdated(): void {
    this.portabilidadeUpdatedSubscription = this.listPortabilidadeService.getPortabilidadeUpdatedObservable().subscribe(() => {
      this.loadPortabilidade();
    });
  }

  ngOnDestroy() {
    if (this.portabilidadeUpdatedSubscription) {
      this.portabilidadeUpdatedSubscription.unsubscribe();
    }
  }
}

