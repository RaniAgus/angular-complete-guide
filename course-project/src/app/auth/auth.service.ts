import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
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
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

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

  autoLogin() {
    const userData:
    { email: string
    ; id: string
    ; _token: string
    ; _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if(userData) {
      const loadedUser = new User
        ( userData.email
        , userData.id
        , userData._token
        , new Date(userData._tokenExpirationDate)
        )
      ;

      if(loadedUser.token) {
        this.user$.next(loadedUser);
      }
    }
  }

  logout() {
    // O sea, se resetea al valor por defecto al iniciar la app 
    this.user$.next(null);
    this.router.navigate(['/auth']);
  }

  get user(): Observable<User> {
    return this.user$.pipe(take(1));
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

    //Se guarda en Application/Storage/Local Storage/localhost:4200
    localStorage.setItem('userData', JSON.stringify(user));
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
