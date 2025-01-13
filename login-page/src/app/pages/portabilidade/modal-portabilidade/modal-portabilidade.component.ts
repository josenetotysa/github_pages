import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControl, Validators  } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
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
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule
  ],
  styleUrl: './modal-portabilidade.component.scss'
})
export class ModalPortabilidadeComponent {

  prefixoMcduFormControl = new FormControl(this.data.prefixoMcdu, [Validators.maxLength(10), Validators.minLength(8)]);


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

  Limpar() {
    this.prefixoMcduFormControl.setValue('');
  }

  submit() {
    if (this.prefixoMcduFormControl.invalid) {
      this.toastrService.error('Verifique os campos', 'Erro ao atualizar dados:');
      this.listPortabilidadeService.notifyPortabilidadeUpdated();
      return;
    }
  
    const { cn, prefixo, sufixo } = this.data;
    const realnumber = `${cn}${prefixo}${sufixo}`;
    const virtualnumber = `${this.prefixoMcduFormControl.value}`;
  
    this.updatePortabilidadeService.updatePortabilidade(realnumber, virtualnumber).subscribe(
      (response) => {
        // Se o retorno for bem-sucedido, mostramos o sucesso
        this.toastrService.success('Campo(s) alterado(s) com sucesso', 'Alteração bem sucedida!');
        this.dialogRef.close();
      },
      (error) => {
        // Caso o número virtual já exista, mostramos o erro
        if (error.status === 400 && error.error?.msg) {
          this.toastrService.error(error.error.msg, 'Erro ao atualizar dados:');
        } else {
          this.toastrService.error('Tente novamente', 'Erro ao atualizar dados:');
        }
      },
      () => {
        // Isso notifica qualquer outro componente que possa precisar da atualização
        this.listPortabilidadeService.notifyPortabilidadeUpdated();
      }
    );
  }
}