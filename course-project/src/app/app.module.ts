import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'
import { NotFoundComponent } from './not-found/not-found.component';

import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RecipesModule } from './recipes/recipes.module';

@NgModule
(
  { declarations: 
      [ AppComponent
      , HeaderComponent
      , ShoppingListComponent
      , ShoppingEditComponent
      , NotFoundComponent
      , AuthComponent
      , LoadingSpinnerComponent
      , DialogComponent
      ]
  , imports: 
      [ // ngIf y ngFor vienen de acá
        BrowserModule 
        // las features de forms vienen de acá
      , FormsModule
      , ReactiveFormsModule
        // esto solo provee servicios (no directivas ni componentes), por lo que
        // va a estar disponible en toda la app
      , HttpClientModule 

      , MatDialogModule
      , BrowserAnimationsModule
      , MatStepperModule
      , AppRoutingModule
      , RecipesModule
      ]
  , providers: 
      [ RecipeService
      , ShoppingListService
      , { provide: HTTP_INTERCEPTORS
        , useClass: AuthInterceptorService
        , multi: true
        }
      ]
  , bootstrap: [AppComponent]
  , entryComponents: [DialogComponent]
  }
)
export class AppModule { }
