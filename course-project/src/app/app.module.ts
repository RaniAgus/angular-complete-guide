import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule
(
  { declarations: 
      [ AppComponent
      , HeaderComponent
      , NotFoundComponent
      , AuthComponent
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
      , AppRoutingModule
      , RecipesModule
      , ShoppingListModule
      , SharedModule
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
  }
)
export class AppModule { }
