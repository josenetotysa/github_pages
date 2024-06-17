import { Component } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonBlueClickComponent } from '../../components/button-blue-click/button-blue-click.component';
import { TitlesComponent } from '../../components/titles/titles.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule,
    ButtonBlueClickComponent,
    TitlesComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.authService.signup(this.signupForm.value.name, this.signupForm.value.email,this.signupForm.value.login, this.signupForm.value.password).subscribe({
      next: () => this.toastService.success("Cadastro realizado com sucesso!"),
      error: () => this.toastService.error("Ops! Houve um erro ao tentar realizar o cadastro. Por favor, tente novamente mais tarde.")
    })

  }
}
