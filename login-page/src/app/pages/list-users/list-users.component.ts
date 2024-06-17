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
import { ModalListusersComponent } from './modal-listusers/modal-listusers.component';


export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
}

const mocks: PeriodicElement[] = [
  { id: 1, name: 'João Silva', email: 'gui@example.com' },
  { id: 2, name: 'Maria Oliveira', email: 'maria.oliveira@example.com' },
  { id: 3, name: 'Pedro Santos', email: 'pedro.santos@example.com' },
  { id: 4, name: 'Ana Souza', email: 'ana.souza@example.com' },
  { id: 5, name: 'Carlos Pereira', email: 'carlos.pereira@example.com' },
  { id: 6, name: 'Fernanda Lima', email: 'fernanda.lima@example.com' },
  { id: 7, name: 'Bruno Costa', email: 'bruno.costa@example.com' },
  { id: 8, name: 'Patrícia Mendes', email: 'patricia.mendes@example.com' },
  { id: 9, name: 'Rafael Almeida', email: 'rafael.almeida@example.com' },
  { id: 10, name: 'Juliana Martins', email: 'juliana.martins@example.com' },
  { id: 11, name: 'Luís Fernando', email: 'luis.fernando@example.com' },
  { id: 12, name: 'Sofia Ribeiro', email: 'sofia.ribeiro@example.com' },
  { id: 13, name: 'Gustavo Lima', email: 'gustavo.lima@example.com' },
  { id: 14, name: 'Mariana Costa', email: 'mariana.costa@example.com' },
  { id: 15, name: 'Rodrigo Fernandes', email: 'rodrigo.fernandes@example.com' },
  { id: 16, name: 'Laura Carvalho', email: 'laura.carvalho@example.com' },
  { id: 17, name: 'Eduardo Silva', email: 'eduardo.silva@example.com' },
  { id: 18, name: 'Beatriz Nunes', email: 'beatriz.nunes@example.com' },
  { id: 19, name: 'Vinícius Souza', email: 'vinicius.souza@example.com' },
  { id: 20, name: 'Amanda Rodrigues', email: 'amanda.rodrigues@example.com' },
  { id: 21, name: 'Felipe Alves', email: 'felipe.alves@example.com' },
  { id: 22, name: 'Renata Dias', email: 'renata.dias@example.com' },
  { id: 23, name: 'Ricardo Lima', email: 'ricardo.lima@example.com' },
  { id: 24, name: 'Camila Ferreira', email: 'camila.ferreira@example.com' },
  { id: 25, name: 'Thiago Moreira', email: 'thiago.moreira@example.com' }
];


@Component({
  selector: 'app-list-users',
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
    MatDialogModule
    
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  loginForm!: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'email', 'editar'];
  dataSource = new MatTableDataSource(mocks);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialog = inject(MatDialog);

  constructor(
    // private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(ModalListusersComponent, {
      width: '450px',
      data: { id: element.id, name: element.name, email: element.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.id = result.id;
        element.name = result.name;
        element.email = result.email;
      }
    });
  }
  
}
