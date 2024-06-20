import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UpdateUsersService } from '../../../services/user/update-users.service';
import { DeleteUsersService } from '../../../services/user/delete-users.service';
import { ListUsersService } from '../../../services/user/list-users.service';
import { finalize } from 'rxjs';

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
    private listUsersService: ListUsersService
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

  deletar(){
    const login = this.data.login;

    this.deleteUsersService.deleteUsers(login).subscribe(
      (response) => {
        console.log('Usuário deletado com sucesso!', response);
        
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erro ao deletar usuário:', error);
        
      },
      () => {
        // Este bloco é chamado quando a requisição é concluída (com sucesso ou erro)
        this.listUsersService.notifyUsersUpdated();
      }
    );
  }

  submit() {
    
    const { name, email, login, password } = this.data;

    this.updateUsersService.updateUsers(name, email, login, password).subscribe(
      (response) => {
        console.log('Dados atualizados com sucesso!', response);
        
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erro ao atualizar dados:', error);
        
      },
      () => {
        // Este bloco é chamado quando a requisição é concluída (com sucesso ou erro)
        this.listUsersService.notifyUsersUpdated();
      }
    );
  }

}

