import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ButtonBlueClickComponent } from '../../components/button-blue-click/button-blue-click.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    ButtonBlueClickComponent
  ],
  providers: [
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value.login, this.loginForm.value.password).subscribe({
        next: () => this.toastService.success('Bem-vindo de volta!', 'Login bem-sucedido'),
        error: () => this.toastService.error('Ops, algo deu errado!', 'Erro de credenciais')
      });
    } else {
      this.toastService.error('Formulário inválido', 'Por favor, preencha todos os campos corretamente.');
    }
  }
}
