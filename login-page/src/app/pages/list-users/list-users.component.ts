import { Component, ViewChild, Injectable } from '@angular/core';
import { TitlesComponent } from '../../components/titles/titles.component';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalListusersComponent } from './modal-listusers/modal-listusers.component';
import { UserResponse } from '../../types/user-response.type';
import { ListUsersService } from '../../services/user/list-users.service';
import { Subscription } from 'rxjs';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';

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
    MatSortModule
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class ListUsersComponent {

  displayedColumns: string[] = ['username', 'fullname', 'email', 'editar'];
  dataSource = new MatTableDataSource<UserResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  private usersUpdatedSubscription: Subscription | undefined;

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    setTimeout(() => {
    const sortState: Sort = { active: 'username', direction: 'asc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    });
  }
  
  constructor(
    private listUsersService: ListUsersService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    console.log("Entrou no list")
    this.dataSource.sort = this.sort;
    this.loadUsers();
    this.subscribeToUsersUpdated();
  }

  loadUsers() {
    this.listUsersService.listUsers().subscribe(
      (users: UserResponse[]) => {
        this.dataSource.data = users;
      },
      (error) => {
        this.toastService.error('Ocorreu um erro ao tentar carregar os dados.', 'Erro ao carregar Usuários', );
      }
    );
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: UserResponse, filter: string) => {
      return (data.username.toLowerCase().includes(filter) || data.fullname.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter))
    };
    
    this.dataSource.filter = filterValue;
  }

  openDialog(element: UserResponse): void {
    const dialogRef = this.dialog.open(ModalListusersComponent, {
      width: '450px',
      data: { username: element.username, fullname: element.fullname, email: element.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.username = result.username;
        element.fullname = result.fullname;
        element.email = result.email;
      }
    });
  }

  private subscribeToUsersUpdated(): void {
    this.usersUpdatedSubscription = this.listUsersService.getUsersUpdatedObservable().subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnDestroy() {
    if (this.usersUpdatedSubscription) {
      this.usersUpdatedSubscription.unsubscribe();
    }
  }
}