import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule
(
  { declarations: 
      [ AppComponent
      , HeaderComponent
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
      , CoreModule
      ]
  , bootstrap: [AppComponent]
  }
)
export class AppModule { }
