import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
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
    MatDialogModule,
    MatIconModule
  ],
  styleUrl: './modal-operadoras.component.scss'
})
export class ModalOperadorasComponent {

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
    
    const { rn1, rel, rn2 } = this.data;

    this.updateOperadorasService.updateOperadoras(rn1, rel, rn2).subscribe(
      (response) => {
        this.toastrService.success('Campo(s) alterado(s) com sucesso', 'Alteração bem sucedida!'),
        this.dialogRef.close();
      },
      (error) => {
        this.toastrService.error('Tente novamente', 'Erro ao atualizar dados:');
      },
      () => {
        this.listOperadorasService.notifyOperadorasUpdated();
      }
    );
  }


  
}
