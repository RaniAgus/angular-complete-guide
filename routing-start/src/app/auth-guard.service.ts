import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService,
              private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, 
                    state: RouterStateSnapshot) {
    const authenticated = await this.authService.isAuthenticated();
    if (!authenticated) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}