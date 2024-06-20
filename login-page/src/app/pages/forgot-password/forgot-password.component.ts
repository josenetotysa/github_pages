import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ButtonBlueClickComponent } from '../../components/button-blue-click/button-blue-click.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TitlesComponent } from '../../components/titles/titles.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    ButtonBlueClickComponent,
    TitlesComponent,
    RouterModule
],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
   
    forgotForm: FormGroup;

    constructor(
        private authService: AuthService,
        private toastService: ToastrService
      ) {
        this.forgotForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        });
      }

    submit() {
        console.log("adsasdasdasd")
      }
}
