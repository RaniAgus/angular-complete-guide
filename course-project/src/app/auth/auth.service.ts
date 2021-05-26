import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'key=AIzaSyDKNNp9Xpn92y9pATWeynlFxXxpqZDFkog';

// Es una buena práctica
interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>
        ( `${baseUrl}signUp?${API_KEY}`
        , { email: email, password: password, returnSecureToken: true }
        )
      .pipe
        ( catchError(this.handleError)
        , tap(this.handleAuthentication.bind(this))
        )
    ;
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>
      ( `${baseUrl}signInWithPassword?${API_KEY}`
        , { email: email, password: password, returnSecureToken: true }
        )
      .pipe
        ( catchError(this.handleError)
        , tap(this.handleAuthentication.bind(this))
        )
    ;
  }

  private handleAuthentication(response: AuthResponseData) {
    // expiresIn es un string que contiene el tiempo de expiración en 
    // segundos, lo pasamos a milisegundos
    const user = new User
      ( response.email
      , response.localId
      , response.idToken
      , new Date( new Date().getTime() + +response.expiresIn * 1000 )
      )
    ;
    this.user$.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    if(!errorRes.error || !errorRes.error.error) {
      return throwError('A network error occurred.');
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError('This email already exists.');
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        return throwError("Wrong email or password.");
      default:
        return throwError('An unknown error occurred.');
    }
  }

}
