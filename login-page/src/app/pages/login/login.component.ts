import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ButtonBlueClickComponent } from '../../components/button-blue-click/button-blue-click.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TitlesComponent } from '../../components/titles/titles.component';
import { RouterModule } from '@angular/router';

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
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get loginControl() {
    return this.loginForm.get('login') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
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