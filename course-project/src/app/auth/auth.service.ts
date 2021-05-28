import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { User } from './user.model';

const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'key=AIzaSyDKNNp9Xpn92y9pATWeynlFxXxpqZDFkog';

const NETWORK_ERROR_MESSAGE = 'A network error occurred.';

const ERROR_MESSAGES = {
  'EMAIL_EXISTS': 'This email already exists.',
  'EMAIL_NOT_FOUND': 'Wrong email or password.',
  'INVALID_PASSWORD': 'Wrong email or password.'
};

const DEFAULT_ERROR_MESSAGE = 'An unknown error occurred.';

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
  tokenExpirationTimer: any;

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
        const expiresIn =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expiresIn);
      }
    }
  }

  logout() {
    // O sea, se resetea al valor por defecto al iniciar la app 
    this.user$.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expiresIn: number) {
    console.log(expiresIn);
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expiresIn);
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

    // Después de cargar el usuario, emite un timer que te desloguea cuando
    // expire el token
    this.autoLogout(+response.expiresIn * 1000)

    //Se guarda en Application/Storage/Local Storage/localhost:4200
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(
      !errorRes.error || !errorRes.error.error ? NETWORK_ERROR_MESSAGE : 
      ERROR_MESSAGES[errorRes.error.error.message] || DEFAULT_ERROR_MESSAGE
    );
  }

}
