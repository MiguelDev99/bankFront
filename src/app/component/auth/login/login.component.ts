import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/auth/login.service';
import { LoginRequest } from '../../../domain/login-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  loginForm = this.formBuilder.group({
    userEmail: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  get userEmail() {
    return this.loginForm.controls.userEmail;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = '';
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.info('Login completo');
          this.router.navigateByUrl('/customer-list');
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }
}
