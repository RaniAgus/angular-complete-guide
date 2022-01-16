import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = 
  [ { path: '', redirectTo: '/recipes', pathMatch: 'full' }
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