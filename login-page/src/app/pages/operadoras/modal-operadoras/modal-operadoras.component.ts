import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UpdateOperadorasService } from '../../../services/operadora/update-operadoras.service';
import { ListOperadorasService } from '../../../services/operadora/list-operadoras.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-operadoras',
  templateUrl: './modal-operadoras.component.html',
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
  styleUrl: './modal-operadoras.component.scss'
})
export class ModalOperadorasComponent {

  rn2FormControl = new FormControl(this.data.rn2, [Validators.maxLength(10)]);
  relFormControl = new FormControl(this.data.rel, [Validators.required, Validators.maxLength(3)]);
  

  constructor(
    public dialogRef: MatDialogRef<ModalOperadorasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private listOperadorasService: ListOperadorasService,
    private updateOperadorasService: UpdateOperadorasService,
    private toastrService: ToastrService
    
  ) { }
    

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submit() {
    
    
    if (this.rn2FormControl.invalid || this.relFormControl.invalid) {
      this.toastrService.error('Verifique os campos', 'Erro ao atualizar dados:');
      this.listOperadorasService.notifyOperadorasUpdated();
      return;
    }
    const { rn1, rn2, rel } = this.data;

    this.updateOperadorasService.updateOperadoras( rn1, rn2, rel ).subscribe(
      () => {
        this.toastrService.success('Campo(s) alterado(s) com sucesso', 'Alteração bem sucedida!'),
        this.dialogRef.close();
      },
      () => {
        this.toastrService.error('Tente novamente', 'Erro ao atualizar dados:');
      },
      () => {
        this.listOperadorasService.notifyOperadorasUpdated();
      }
    );
  }


  
}
