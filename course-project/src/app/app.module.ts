import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'
import { NotFoundComponent } from './not-found/not-found.component';

import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule
(
  { declarations: 
      [ AppComponent
      , HeaderComponent
      , RecipesComponent
      , RecipeListComponent
      , RecipeDetailComponent
      , RecipeItemComponent
      , RecipeEditComponent
      , ShoppingListComponent
      , ShoppingEditComponent
      , NotFoundComponent
      , RecipeStartComponent
      , AuthComponent
      , DropdownDirective
      , LoadingSpinnerComponent
      , DialogComponent
      ]
  , imports: 
      [ BrowserModule
      , FormsModule
      , ReactiveFormsModule
      , HttpClientModule
      , AppRoutingModule
      , MatDialogModule
      , BrowserAnimationsModule
      ]
  , providers: 
      [RecipeService
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
