import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  private allowedUrls = ['/auth/login'];

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: String = this.loginService.userToken;

    if (token !== '' && !this.allowedUrls.includes(req.url)) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
