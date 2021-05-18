import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    ;
  }
}
