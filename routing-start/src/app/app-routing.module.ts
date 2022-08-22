import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users' /* Sin el slash! */,
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },
  {
    path: 'servers',
    canActivateChild: [AuthGuard],
    // La Guard tiene que tener implementado el método canActivateChild
    component: ServersComponent,
    // Todos necesitan un <router-outlet>
    children: [
      {
        path: ':id',
        component: ServerComponent,
        // Es un diccionario cuyos valores los decidimos nosotros
        resolve: { server: ServerResolver },
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  {
    path: 'server-error',
    component: ErrorPageComponent,
    data: { message: 'Internal server error!' },
  },
  { path: '**', redirectTo: '/not-found' },
];
@NgModule({
  imports: [
    // Esto agrega un hashtag al final de la ruta para que el servidor que está
    // hosteando la aplicación ignore lo que viene después del hashtag. Esto
    // evita que el servidor intente parsear la ruta y devuelva un 404 al no
    // encontrarla (ya que toda la app se encuentra en un solo index.html)
    // Ej: localhost:4200/#/users
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
