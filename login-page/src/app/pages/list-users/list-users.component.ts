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


export interface PeriodicElement {
  login: string;
  name: string;
  email: string;
  password: string;
}

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

  loginForm!: FormGroup;
  displayedColumns: string[] = ['login', 'name', 'email', 'password', 'editar'];
   dataSource = new MatTableDataSource<UserResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private listUsersService: ListUsersService,
    // private loginService: LoginService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) {
   
  }
  
  list() {
    // Lógica para listar usuários
    console.log('Função para listar usuários foi chamada!');
    // Aqui você pode chamar o método loadUsers() ou qualquer outra ação desejada
  }

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
        this.toastService.error('Erro ao carregar usuários', 'Ocorreu um erro ao tentar carregar os usuários. Por favor, tente novamente mais tarde.');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element: UserResponse): void {
    const dialogRef = this.dialog.open(ModalListusersComponent, {
      width: '450px',
      data: { login: element.login, name: element.name, email: element.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.login = result.login;
        element.name = result.name;
        element.email = result.email;
      }
    });
  }
}
