import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  // error: string = null;

  @ViewChild(PlaceholderDirective, {static: false})
  alertHost: PlaceholderDirective;

  constructor
    ( private authService: AuthService
    , private router: Router
    , private componentFactoryResolver: ComponentFactoryResolver
    ) { }

  ngOnInit(): void {
  }

  // onLoad() {
  //   this.isLoading = true;
  //   this.error = null;
  // }

  // onLoaded(error: string) {
  //   this.isLoading = false;
  //   this.error = error;
  // }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;
    
    let authObs = this.isLoginMode 
      ? this.authService.login(email, password)
      : this.authService.signup(email, password)

    authObs
      .pipe(tap(responseData => this.isLoading = false))
      .subscribe
        ( responseData => {
            console.log(responseData);
            this.router.navigate(['/recipes']);
          }
        , error => {
            this.showErrorAlert(error);
          }
        )
    ;

    form.reset();
  }

  // onErrorHandled() {
  //   this.error = null;
  //}

  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    hostViewContainerRef.createComponent(alertComponentFactory);
  }
}
