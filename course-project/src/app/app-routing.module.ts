import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

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
// , { path: '**'           , redirectTo: '/404'           }
  ]
;

// Esta preloadingStrategy me permite que se precarguen todos los módulos detrás de la app
// Con esto, obtenemos lo mejor de ambos mundos: una carga rápida y fluidez al navegar
@NgModule
( { imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })]
  , exports: [RouterModule]
  }
)
export class AppRoutingModule {

}
