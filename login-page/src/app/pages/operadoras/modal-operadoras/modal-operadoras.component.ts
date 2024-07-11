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
  relFormControl = new FormControl(this.data.rel, [Validators.maxLength(3)]);
  

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

  Limpar() {
    this.relFormControl.setValue('');
    this.rn2FormControl.setValue('');
  }


  submit() {
    
    
    if (this.rn2FormControl.invalid || this.relFormControl.invalid) {
      this.toastrService.error('Verifique os campos', 'Erro ao atualizar dados:');
      this.listOperadorasService.notifyOperadorasUpdated();
      return;
    }

    let { rn1, rn2, rel } = this.data;

    // Define o valor padrão para rel se não for passado
    if (rel == null || rel == "") {
      rel = 41;
    }

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
