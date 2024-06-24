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

  displayedColumns: string[] = ['login', 'name', 'email', 'editar'];
  dataSource = new MatTableDataSource<UserResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  private usersUpdatedSubscription: Subscription | undefined;

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const sortState: Sort = { active: 'login', direction: 'asc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
  
  constructor(
    private listUsersService: ListUsersService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
  
    const filters = filterValue.split(' ');
  
    this.dataSource.filterPredicate = (data: UserResponse, filter: string) => {
      const searchString = filter.toLowerCase().trim();
      let matches = true;
  
      filters.forEach(term => {
        if (!(data.login.toLowerCase().includes(term) || data.name.toLowerCase().includes(term) || data.email.toLowerCase().includes(term))) {
          matches = false;
        }
      });
  
      return matches;
    };
  
    this.dataSource.filter = filterValue;
  }

  openDialog(element: UserResponse): void {
    const dialogRef = this.dialog.open(ModalListusersComponent, {
      width: '450px',
      data: { login: element.login, name: element.name, email: element.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.login = result.login;
        element.name = result.name;
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