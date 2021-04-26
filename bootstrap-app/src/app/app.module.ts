import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'; // 5 - el cual se importa acá
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component' // (018) 2 - el cual se importa acá

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent // (018) 1 - Agregamos el componente 'server'
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] // 4 - Indica que debe tener cargado app.component.ts
})
export class AppModule { }
