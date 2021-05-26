import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoad() {
    this.isLoading = true;
    this.error = null;
  }

  onLoaded(error: string) {
    this.isLoading = false;
    this.error = error;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    this.onLoad();

    const email = form.value.email;
    const password = form.value.password;
    
    let authObs = this.isLoginMode 
      ? this.authService.login(email, password)
      : this.authService.signup(email, password)

    authObs.subscribe
      ( responseData => {
          console.log(responseData);
          this.onLoaded(null);
          this.router.navigate(['/recipes']);
        }
      , error => {
          this.onLoaded(error);
        }
      )
    ;

    form.reset();
  }
}
