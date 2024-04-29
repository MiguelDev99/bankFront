import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './auth/login.service';
import { DocumentType } from '../domain/document-type';
import { Observable } from 'rxjs';
import { API_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  url: string = `${API_URL}/api/v1/document-type`;
  token = this.loginService.userToken;
  headers = new HttpHeaders({
    Authorization:
      `Bearer ${this.token}`,
  });

  constructor(public httpClient: HttpClient, private loginService: LoginService) {}

  findAll(): Observable<DocumentType[]> {
    return this.httpClient.get<DocumentType[]>(this.url, { headers: this.headers });
  }

  findById(id: number): Observable<DocumentType> {
    return this.httpClient.get<DocumentType>(`${this.url}/${id}`);
  }
}
