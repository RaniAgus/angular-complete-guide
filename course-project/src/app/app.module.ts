import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule
(
  { declarations: 
      [ AppComponent
      , HeaderComponent
      ]
  , imports: 
      [ AppRoutingModule
      , AuthModule
      , RecipesModule
      , ShoppingListModule
      , SharedModule
      , CoreModule
      // ngIf y ngFor vienen de acá, junto con cosas de inicialización de la app
      , BrowserModule 
      // esto solo provee servicios (no directivas ni componentes), por lo que
      // va a estar disponible en toda la app
      , HttpClientModule 
      ]
  , bootstrap: [AppComponent]
  }
)
export class AppModule {}
