import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // Normalmente no se hace esto, afecta otros componentes
  // Otras opciones: ShadowDom (usa esa tecnología), Emulated (comportamiento default)
})
export class AppComponent {
  serverElements = 
    [
      { type: 'server'
      , name: 'Test server'
      , content: 'Just a test!'
      }
    ]
    ;

  onServerAdded(serverData: {newServerName: string, newServerContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.newServerName,
      content: serverData.newServerContent
    });
  }

  onBlueprintAdded(blueprintData: {newServerName: string, newServerContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.newServerName,
      content: blueprintData.newServerContent
    });
  }
}
