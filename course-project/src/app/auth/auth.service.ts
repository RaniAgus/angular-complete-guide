import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'AIzaSyDKNNp9Xpn92y9pATWeynlFxXxpqZDFkog';

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

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    let url = baseUrl + 'signUp?key=' + API_KEY;
    return this.http
      .post<AuthResponseData>
        ( url
        , { email: email, password: password, returnSecureToken: true }
        )
      .pipe(catchError(this.handleError))
    ;
  }

  login(email: string, password: string) {
    let url = baseUrl + 'signInWithPassword?key=' + API_KEY;
    return this.http
      .post<AuthResponseData>
        ( url
        , { email: email, password: password, returnSecureToken: true }
        )
      .pipe(catchError(this.handleError))
    ;
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
