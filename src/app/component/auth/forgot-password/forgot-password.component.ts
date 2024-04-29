import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ForgotPasswordService } from "../../../service/auth/forgot-password.service";
import { ForgotPasswordRequest } from "../../../domain/forgot-password-request";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  forgotPasswordError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private forgotPasswordService: ForgotPasswordService
  ) { }

  ngOnInit(): void {}

  get email() {
    return this.forgotPasswordForm.controls.email;
  }

  submitRequest() {
    if (this.forgotPasswordForm.valid) {
      this.forgotPasswordService.sendResetRequest(this.forgotPasswordForm.value as ForgotPasswordRequest).subscribe({
        next: (response) => {
          console.log(response);},
        error: (error) => {
          console.error(error);
          this.forgotPasswordError = 'Error al enviar la solicitud';
        },
        complete: () => {
          console.info('Contraseña reseteada');
        },
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
      console.log("ERROR EN EL PROCESO");
    }
  }
}
