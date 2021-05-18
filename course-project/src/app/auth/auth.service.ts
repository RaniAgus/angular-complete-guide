import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_KEY = 'AIzaSyDKNNp9Xpn92y9pATWeynlFxXxpqZDFkog';

// Es una buena práctica
interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
    return this.http
      .post<AuthResponseData>
        ( url
        , { email: email, password: password, returnSecureToken: true }
        )
      .pipe(catchError(errorRes => throwError(this.getErrorMessage(errorRes))))
    ;
  }

  private getErrorMessage(errorRes) {
    if(!errorRes.error || !errorRes.error.error) {
      return 'A network error occurred.';
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        return 'This email already exists.';
      default:
        return 'An unknown error occurred.';
    }
  }
}
