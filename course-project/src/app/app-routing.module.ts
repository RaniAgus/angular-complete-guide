import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const appRoutes: Routes = 
  [ { path: '', redirectTo: '/recipes', pathMatch: 'full' }
  , { path: 'auth'         , component: AuthComponent     }
  , { path: '404'          , component: NotFoundComponent }
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