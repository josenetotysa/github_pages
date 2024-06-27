import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
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
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule
  ],
  styleUrl: './modal-listusers.component.scss'
})
export class ModalListusersComponent {

  fullnameFormControl = new FormControl(this.data.fullname, [Validators.required, Validators.maxLength(100)]);
  emailFormControl = new FormControl(this.data.email, [Validators.required, Validators.email , Validators.maxLength(60)]);
  passwordFormControl = new FormControl(this.data.password);
 
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
    if (this.showPasswordField) {
      this.passwordFormControl.setValidators([Validators.required, Validators.maxLength(45)]);
    } else {
      this.passwordFormControl.clearValidators();
    }
    this.passwordFormControl.updateValueAndValidity();
  }
  
  submit() {
    
    if (this.fullnameFormControl.invalid || this.emailFormControl.invalid  || this.passwordFormControl.invalid) {
      this.toastrService.error('Verifique os campos', 'Erro ao atualizar dados:');
      this.listUsersService.notifyUsersUpdated();
      return;
    }

    const { fullname, email, username, password } = this.data;

    this.updateUsersService.updateUsers(fullname, email, username, password).subscribe(
       () => {
        this.toastrService.success('Campo(s) alterado(s) com sucesso', 'Alteração bem sucedida!'),
        this.dialogRef.close();
      },
      () => {
        this.toastrService.error('Tente novamente', 'Erro ao atualizar dados:');
      },
      () => {
        this.listUsersService.notifyUsersUpdated();
      }
    );
  }

  
  deletar(){
    const username = this.data.username;

    this.deleteUsersService.deleteUsers(username).subscribe(
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

