import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";

import { NotFoundComponent } from "./not-found/not-found.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = 
  [ { path: '', redirectTo: '/auth', pathMatch: 'full' }
  , { path: 'recipes'
    , component: RecipesComponent 
    , children:
      [ { path: ''        , component: RecipeStartComponent  }
      , { path: 'new'     , component: RecipeEditComponent   }
      , { path: ':id'     
        , component: RecipeDetailComponent 
        , resolve: [RecipesResolverService] 
        }
      , { path: ':id/edit'
        , component: RecipeEditComponent
        , resolve: [RecipesResolverService] 
        }
      ]
    }
  , { path: 'shopping-list', component: ShoppingListComponent }
  , { path: 'auth'         , component: AuthComponent         }
  , { path: '404'          , component: NotFoundComponent     }
  , { path: '**'           , redirectTo: '/404'               }
  ]
;

@NgModule
( { imports: [RouterModule.forRoot(appRoutes)]
  , exports: [RouterModule]
  }
)
export class AppRoutingModule {

}