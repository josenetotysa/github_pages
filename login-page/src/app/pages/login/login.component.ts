import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ButtonBlueClickComponent } from '../../components/button-blue-click/button-blue-click.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TitlesComponent } from '../../components/titles/titles.component';
import { RouterModule } from '@angular/router';

type InputTypes = "text" | "password" | "email";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    ButtonBlueClickComponent,
    TitlesComponent,
    RouterModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordType: InputTypes = 'password';  // Controla o tipo de senha

  constructor(
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get loginControl() {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  // Método para alternar o tipo da senha
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  // submit() {
  //   if (this.loginForm.valid) {
  //     this.authService.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe({
  //       next: () => {
  //         this.toastService.success('Bem-vindo de volta!', 'Login bem-sucedido');
  //       },
  //       error: () => this.toastService.error('Ops, algo deu errado!', 'Erro de credenciais')
  //     });
  //   } else {
  //     this.toastService.error('Formulário inválido', 'Por favor, preencha todos os campos corretamente.');
  //   }
  // }

  submit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.authService.authenticate(username, password).subscribe({
        next: () => {
          // Login bem-sucedido
          this.toastService.success('Bem-vindo de volta!', 'Login bem-sucedido');
        },
        error: (error) => {
          // Tratar diferentes códigos de status retornados pelo back-end
          if (error.status === 0) {
            // Erro de conexão com o servidor
            this.toastService.error('Não foi possível conectar ao servidor', 'ERROR - Erro de conexão');
          } else {
            switch (error.status) {
              case 401:
                this.toastService.error('Senha incorreta', 'ERROR 401 - Erro de autenticação');
                break;
              case 404:
                this.toastService.error('Usuário não encontrado', 'ERROR 404 - Erro de autenticação');
                break;
              case 500:
                this.toastService.error('Erro interno no servidor', 'ERROR 500 - Por favor, tente novamente mais tarde');
                break;
              default:
                this.toastService.error('Ops, algo deu errado!', 'Erro desconhecido');
                break;
            }
          }
        }
      });
    } else {
      // Formulário inválido
      this.toastService.error('Por favor, preencha todos os campos corretamente.', 'Formulário inválido');
    }
  }
  
}