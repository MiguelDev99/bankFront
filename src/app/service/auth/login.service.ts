import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, throwError } from 'rxjs';
import { API_URL } from '../../app.component';
import { LoginRequest } from '../../domain/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }

  login(credentials:LoginRequest):Observable<any>{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    return this.http.post<any>(API_URL+"/auth/login",credentials).pipe(
      tap((userData)=>{
        sessionStorage.setItem("token",userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=>userData.token),
      catchError(this.handleError)
    );
  }
  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error',error.error);
    }else{
      console.error('Backend retorno el codigo de estado',error);
    }
    return throwError(()=>new Error('Algo fallo. Por favor intente nuevamente'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
}
