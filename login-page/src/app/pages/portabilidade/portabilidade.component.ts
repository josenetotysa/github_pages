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
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
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
    MatDialogModule,
    MatSortModule
  ],
  templateUrl: './portabilidade.component.html',
  styleUrl: './portabilidade.component.scss',

  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class PortabilidadeComponent {

  displayedColumns: string[] = ['cn', 'prefixo', 'sufixo', 'prefixoV', 'sufixoV', 'editar'];
  dataSource = new MatTableDataSource<PortabilidadeResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private portabilidadeUpdatedSubscription: Subscription | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    setTimeout(() => {
      const sortState: Sort = { active: 'cn', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }
  constructor(
    private listPortabilidadeService: ListPortabilidadeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
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

            prefixoV: virtualnumber.substring(0, 4),
            sufixoV: virtualnumber.substring(4, 8)
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

    this.dataSource.filterPredicate = (data: PortabilidadeResponse, filter: string) => {
      return data.realnumber.toLowerCase().includes(filter)
    };

    this.dataSource.filter = filterValue;
  }

  openDialog(element: PortabilidadeResponse): void {
    const dialogRef = this.dialog.open(ModalPortabilidadeComponent, {
      width: '600px',
      data: { cn: element.cn, prefixo: element.prefixo, sufixo: element.sufixo, prefixoV: element.prefixoV, sufixoV: element.sufixoV }
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

