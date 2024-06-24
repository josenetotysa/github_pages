import { Component, Injectable, ViewChild, inject } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TitlesComponent } from '../../components/titles/titles.component';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalOperadorasComponent } from './modal-operadoras/modal-operadoras.component';
import { OperadoraResponse } from '../../types/operadora-response.type';
import { ListOperadorasService } from '../../services/operadora/list-operadoras.service';
import { Subscription } from 'rxjs';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

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
  selector: 'app-operadoras',
  standalone: true,
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule,
    TitlesComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule
  ],
  templateUrl: './operadoras.component.html',
  styleUrl: './operadoras.component.scss'
})
export class OperadorasComponent {

  displayedColumns: string[] = ['rn1', 'operadora', 'rn2', 'rel', 'editar'];
  dataSource = new MatTableDataSource<OperadoraResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private operadorasUpdatedSubscription: Subscription | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const sortState: Sort = { active: 'rn1', direction: 'asc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  constructor(
    private listOperadorasService: ListOperadorasService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.loadOperadoras();
    this.subscribeToOperadorasUpdated();
  }

  loadOperadoras() {
    this.listOperadorasService.listOperadoras().subscribe(
      (operadoras: OperadoraResponse[]) => {
        this.dataSource.data = operadoras;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.toastService.error('Ocorreu um erro ao tentar carregar os dados.', 'Erro ao carregar Routing Numbers', );
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    const filters = filterValue.split(' ');

    this.dataSource.filterPredicate = (data: OperadoraResponse, filter: string) => {
      const searchString = filter.toLowerCase().trim();
      let matches = true;
  
      filters.forEach(term => {
        if (!(data.routernumber.toLowerCase().includes(term) || data.telconame.toLowerCase().includes(term))) {
          matches = false;
        }
      });
  
      return matches;
    };
  
    this.dataSource.filter = filterValue;
  }

  openDialog(element: OperadoraResponse): void {
    const dialogRef = this.dialog.open(ModalOperadorasComponent, {
      width: '450px',
      data: { rn1: element.routernumber, operadora: element.telconame, rn2: element.telcomap, rel: element.releasenumber }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.routernumber = result.rn1;
        element.telconame = result.operadora;
        element.telcomap = result.rn2;
        element.releasenumber = result.rel;
      }
    });
  }

  private subscribeToOperadorasUpdated(): void {
    this.operadorasUpdatedSubscription = this.listOperadorasService.getOperadorasUpdatedObservable().subscribe(() => {
      this.loadOperadoras();
    });
  }

  ngOnDestroy() {
    if (this.operadorasUpdatedSubscription) {
      this.operadorasUpdatedSubscription.unsubscribe();
    }
  }
}