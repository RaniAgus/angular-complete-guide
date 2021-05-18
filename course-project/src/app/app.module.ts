import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

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
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';

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
      ]
  , imports: 
      [ BrowserModule
      , ReactiveFormsModule
      , HttpClientModule
      , AppRoutingModule
      ]
  , providers: [RecipeService, ShoppingListService]
  , bootstrap: [AppComponent]
  }
)
export class AppModule { }
