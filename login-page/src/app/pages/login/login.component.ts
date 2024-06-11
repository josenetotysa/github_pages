import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers:[
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({

      login: new FormControl('',[Validators.required, Validators.minLength(6)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
      next: () => this.toastService.success('Bem-vindo de volta!', 'Login bem-sucedido'),
      error: () => this.toastService.error('Ops, algo deu errado!', 'Erro de credenciais')
    })
    
  }

}
