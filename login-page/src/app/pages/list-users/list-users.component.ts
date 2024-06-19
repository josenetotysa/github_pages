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
import { UserResponse } from '../../types/user-response.type';
import { ListUsersService } from '../../services/list-users.service';


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
    MatDialogModule,
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {

  displayedColumns: string[] = ['login', 'name', 'email', 'password', 'editar'];
  dataSource = new MatTableDataSource<UserResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(
    private listUsersService: ListUsersService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.listUsersService.listUsers().subscribe(
      (users: UserResponse[]) => {
        this.dataSource.data = users;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.toastService.error('Erro ao carregar usuários', 'Ocorreu um erro ao tentar carregar os usuários.');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Dividir o filtro em termos individuais
    const filters = filterValue.split(' ');
  
    // Aplicar o filtro customizado
    this.dataSource.filterPredicate = (data: UserResponse, filter: string) => {
      const searchString = filter.toLowerCase().trim();
      let matches = true;
  
      // Verificar se algum dos termos do filtro está presente em rn1 ou operadora
      filters.forEach(term => {
        if (!(data.login.toLowerCase().includes(term) || data.name.toLowerCase().includes(term) || data.email.toLowerCase().includes(term))) {
          matches = false;
        }
      });
  
      return matches;
    };
  
    // Aplicar o filtro
    this.dataSource.filter = filterValue;
  }

  openDialog(element: UserResponse): void {
    const dialogRef = this.dialog.open(ModalListusersComponent, {
      width: '450px',
      data: { login: element.login, name: element.name, email: element.email, password: element.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.login = result.login;
        element.name = result.name;
        element.email = result.email;
        element.password =  result.password;
      }
    });
  }
}