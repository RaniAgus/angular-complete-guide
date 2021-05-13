import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{

    // Este código se ejecuta por cada request que se haga en toda la app
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        return next.handle(request); // Esto permite que la solicitud continúe
    }
}