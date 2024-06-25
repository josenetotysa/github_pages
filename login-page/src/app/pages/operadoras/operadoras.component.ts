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

  displayedColumns: string[] = ['routernumber', 'telconame', 'telcomap', 'releasenumber', 'editar'];
  dataSource = new MatTableDataSource<OperadoraResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private operadorasUpdatedSubscription: Subscription | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    setTimeout(() => {
    const sortState: Sort = { active: 'routernumber', direction: 'asc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    });
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
        this.toastService.error('Ocorreu um erro ao tentar carregar os dados.', 'Erro ao carregar Routing Numbers', );
      }
    );
  }

  applyFilter(event: Event) {
    // Captura o valor do filtro, remove espaços em branco e converte para minúsculas
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Define o predicado de filtro para a fonte de dados
    this.dataSource.filterPredicate = (data: OperadoraResponse, filter: string) => {
      // Verifica se o valor do filtro está presente no routernumber ou telconame
      return data.routernumber.toLowerCase().includes(filter) || 
             data.telconame.toLowerCase().includes(filter);
    };
  
    // Aplica o filtro à fonte de dados
    this.dataSource.filter = filterValue;
  }


  openDialog(element: OperadoraResponse): void {
    const dialogRef = this.dialog.open(ModalOperadorasComponent, {
      width: '450px',
      data: { rn1: element.routernumber, operadora: element.telconame, rn2: element.telcomap, rel: element.releasenumber }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.routernumber = result.routernumber;
        element.telconame = result.telconame;
        element.telcomap = result.telcomap;
        element.releasenumber = result.releasenumber;
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