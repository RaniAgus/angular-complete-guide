import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  // Este código se ejecuta por cada request que se haga en toda la app
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Las requests son inmutables, hay que crear una nueva y pasarle qué atributos queremos sobreescribir
    const modifiedRequest = request.clone({
      headers: request.headers.append('Auth', 'xyz'),
    });
    return next.handle(modifiedRequest); // Esto permite que la solicitud continúe
  }
}
