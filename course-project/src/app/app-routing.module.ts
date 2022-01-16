import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = 
  [ { path: '', redirectTo: '/recipes', pathMatch: 'full' }
  , { path: 'auth'
    , loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
  , { path: 'recipes'
    , loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
    }
  , { path: 'shopping-list'
    , loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    }
// Tuve que quitarlo para que no me mande acá al entrar a /recipes
//, { path: '**'           , redirectTo: '/404'           }
  ]
;

@NgModule
( { imports: [RouterModule.forRoot(appRoutes)]
  , exports: [RouterModule]
  }
)
export class AppRoutingModule {

}