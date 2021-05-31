import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  // error: string = null;

  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(PlaceholderDirective, {static: false})
  alertHost: PlaceholderDirective;

  constructor
    ( private authService: AuthService
    , private router: Router
    , private componentFactoryResolver: ComponentFactoryResolver
    , private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
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
      // finalize() ejecuta en éxito y en error, tap() no
      .pipe(finalize(() => this.isLoading = false))
      .subscribe
        ( responseData => {
            console.log(responseData);
            this.router.navigate(['/recipes']);
          }
        , error => {
            this.showErrorDialog(error);
          }
        )
    ;

    form.reset();
  }

  // onErrorHandled() {
  //   this.error = null;
  //}

  private showErrorDialog(errorMessage: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: errorMessage,
    })

    dialogRef
      .afterClosed()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe()
    ;
  }

  private showErrorAlert(errorMessage: string) {
    // Obtengo la forma de crear el componente
    const alertComponentFactory = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent);

    // Obtengo la referencia en el DOM donde quiero que esté el componente
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    // Limpio la referencia si ésta tenía algún otro componente
    hostViewContainerRef.clear();

    // Creo el componente
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    // Data binding
    componentRef.instance.message = errorMessage;

    // Event binding
    componentRef.instance.close
      // Finaliza el componente tanto al destruirlo como al obtener la primera respuesta
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(() => hostViewContainerRef.clear());
  }
}
