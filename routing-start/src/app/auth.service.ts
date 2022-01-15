import { promisify } from 'util';

export class AuthService {
  loggedIn = false;

  async isAuthenticated() {
    await promisify(setTimeout)(800);
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}