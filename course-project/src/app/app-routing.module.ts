import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from "./not-found/not-found.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = 
  [ { path: '', redirectTo: 'recipes', pathMatch: 'full' }
  , { path: 'recipes', component: RecipesComponent }
  , { path: 'shopping-list', component: ShoppingListComponent }
  , { path: '404', component: NotFoundComponent }
  , { path: '**', redirectTo: '404' }
  ]
;

@NgModule
( { imports: [RouterModule.forRoot(appRoutes)]
  , exports: [RouterModule]
  }
)
export class AppRoutingModule {

}