import { Component } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TitlesComponent } from '../../components/titles/titles.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule,
    TitlesComponent
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  loginForm!: FormGroup;


  constructor(
    // private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  // submit(){
  //   this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
  //     next: () => this.toastService.success('Bem-vindo de volta!', 'Login bem-sucedido'),
  //     error: () => this.toastService.error('Ops, algo deu errado!', 'Erro de credenciais')
  //   })

  // }
}
