import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = 
  [ { path: '', component: HomeComponent }
  , { path: 'users' /* Sin el slash! */
    , component: UsersComponent
    , children:
      [ { path: ':id/:name', component: UserComponent } ]
    } 
  , { path: 'servers'
    , canActivateChild: [ AuthGuard ] 
    // La Guard tiene que tener implementado el método canActivateChild
    , component: ServersComponent
    , children: // Todos necesitan un <router-outlet>
      [ { path: ':id'
        , component: ServerComponent 
        , resolve: // Es un diccionario cuyos valores los decidimos nosotros
          { server: ServerResolver }
        }
      , { path: ':id/edit', component: EditServerComponent, canDeactivate: [ CanDeactivateGuard ] }
      ] 
    }
  , { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } }
  , { path: 'server-error', component: ErrorPageComponent, data: { message: 'Internal server error!' } }
  , { path: '**', redirectTo: '/not-found' }
  ]
;

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ 
    RouterModule
  ]
})
export class AppRoutingModule {

}