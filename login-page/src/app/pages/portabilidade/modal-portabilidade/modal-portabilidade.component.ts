import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ListPortabilidadeService } from '../../../services/portabilidade/list-portabilidade.service';
import { UpdatePortabilidadeService } from '../../../services/portabilidade/update-portabilidade.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-portabilidade',
  templateUrl: './modal-portabilidade.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatIconModule
  ],
  styleUrl: './modal-portabilidade.component.scss'
})
export class ModalPortabilidadeComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalPortabilidadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private listPortabilidadeService: ListPortabilidadeService,
    private updatePortabilidadeService: UpdatePortabilidadeService,
    private toastrService: ToastrService
  
  
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }

  submit() {
    
    const { cn, prefixo, sufixo,  prefixoV, sufixoV } = this.data;
    const realnumber = `${cn}${prefixo}${sufixo}`;
    const virtualnumber = `${prefixoV}${sufixoV}`;

    this.updatePortabilidadeService.updatePortabilidade( realnumber, virtualnumber ).subscribe(
      () => {
        this.toastrService.success('Campo(s) alterado(s) com sucesso', 'Alteração bem sucedida!'),
        this.dialogRef.close();
      },
      () => {
        this.toastrService.error('Tente novamente', 'Erro ao atualizar dados:');
      },
      () => {
        this.listPortabilidadeService.notifyPortabilidadeUpdated();
      }
    );
  }
}