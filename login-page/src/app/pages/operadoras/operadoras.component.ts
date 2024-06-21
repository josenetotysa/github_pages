import { Component, ViewChild, inject } from '@angular/core';
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
  ],
  templateUrl: './operadoras.component.html',
  styleUrl: './operadoras.component.scss'
})
export class OperadorasComponent {

  displayedColumns: string[] = ['rn1', 'operadora', 'rn2', 'rel', 'editar'];
  dataSource = new MatTableDataSource<OperadoraResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private operadorasUpdatedSubscription: Subscription | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private listOperadorasService: ListOperadorasService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
  
    // Dividir o filtro em termos individuais
    const filters = filterValue.split(' ');
  
    // Aplicar o filtro customizado
    this.dataSource.filterPredicate = (data: OperadoraResponse, filter: string) => {
      const searchString = filter.toLowerCase().trim();
      let matches = true;
  
      // Verificar se algum dos termos do filtro está presente em rn1 ou operadora
      filters.forEach(term => {
        if (!(data.rn1.toLowerCase().includes(term) || data.operadora.toLowerCase().includes(term))) {
          matches = false;
        }
      });
  
      return matches;
    };
  
    // Aplicar o filtro
    this.dataSource.filter = filterValue;
  }

  openDialog(element: OperadoraResponse): void {
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