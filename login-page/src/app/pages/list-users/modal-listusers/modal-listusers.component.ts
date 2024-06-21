import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UpdateUsersService } from '../../../services/user/update-users.service';
import { DeleteUsersService } from '../../../services/user/delete-users.service';
import { ListUsersService } from '../../../services/user/list-users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-listusers',
  templateUrl: './modal-listusers.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatIconModule
  ],
  styleUrl: './modal-listusers.component.scss'
})
export class ModalListusersComponent {

  showPasswordField = false;

  constructor(
    public dialogRef: MatDialogRef<ModalListusersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private updateUsersService: UpdateUsersService,
    private deleteUsersService: DeleteUsersService,
    private listUsersService: ListUsersService,
    private toastrService: ToastrService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  togglePasswordField(): void {
    this.showPasswordField = !this.showPasswordField;
  }

  submit() {
    
    const { name, email, login, password } = this.data;

    this.updateUsersService.updateUsers(name, email, login, password).subscribe(
       (response) => {
        this.toastrService.success('Campo(s) alterado(s) com sucesso', 'Alteração bem sucedida!'),
        this.dialogRef.close();
      },
      (error) => {
        this.toastrService.error('Tente novamente', 'Erro ao atualizar dados:');
      },
      () => {
        this.listUsersService.notifyUsersUpdated();
      }
    );
  }

  
  deletar(){
    const login = this.data.login;

    this.deleteUsersService.deleteUsers(login).subscribe(
      (response) => {
        this.toastrService.success('Usuário deletado com sucesso!');
        
        this.dialogRef.close();
      },
      (error) => {
        this.toastrService.error('Erro ao deletar usuário:', error);
        
      },
      () => {
        this.listUsersService.notifyUsersUpdated();
      }
    );
  }

}

