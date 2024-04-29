import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPasswordRequest } from '../../domain/forgot-password-request';
import { API_URL } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService { // URL del endpoint para restablecer contraseña, cambiar según tu configuración

  constructor(private http: HttpClient) { }

  sendResetRequest(credentials:ForgotPasswordRequest): Observable<any> {
    // Aquí envías la solicitud POST al servidor con el correo electrónico del usuario
    // Por ejemplo, utilizando HttpClient de Angular
    return this.http.post<any>(API_URL+"/auth/forgot-password",credentials);
  }
}
