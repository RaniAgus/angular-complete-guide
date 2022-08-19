import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      // Cambiamos el observable
      exhaustMap((user) => next.handle(this.addAuthParam(user, req)))
    );
  }

  private addAuthParam(user: User, req: HttpRequest<any>): HttpRequest<any> {
    // Esto es para que no intercepte las requests de login/signup
    return !user
      ? req
      : req.clone({ params: new HttpParams().set('auth', user.token) });
  }
}
