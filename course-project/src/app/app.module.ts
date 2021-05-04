import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'
import { DropdownDirective } from './shared/dropdown.directive';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = 
  [ { path: '', redirectTo: 'recipes', pathMatch: 'full' }
  , { path: 'recipes', component: RecipesComponent }
  , { path: 'shopping-list', component: ShoppingListComponent }
  , { path: '404', component: NotFoundComponent }
  , { path: '**', redirectTo: '404' }
  ]
;

@NgModule
(
  { declarations: 
      [ AppComponent
      , HeaderComponent
      , RecipesComponent
      , RecipeListComponent
      , RecipeDetailComponent
      , RecipeItemComponent
      , ShoppingListComponent
      , ShoppingEditComponent
      , NotFoundComponent
      , DropdownDirective
      ]
  , imports: 
      [ BrowserModule
      , RouterModule.forRoot(appRoutes)
      ]
  , providers: []
  , bootstrap: [AppComponent]
  }
)
export class AppModule { }
