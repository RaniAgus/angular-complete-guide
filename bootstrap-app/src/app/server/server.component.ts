import { Component } from '@angular/core';

@Component({
  // Component decorator
  selector: 'app-server', // The HTML tag 'app-x'
  templateUrl: './server.component.html', // El path (relativo) hacia el template HTML
  styles: [
    `
      .online {
        color: white;
      }
    `,
  ],
})
export class ServerComponent {
  serverId: number = 12;
  serverStatus: string = 'offline';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus(): string {
    return this.serverStatus;
  }

  getColor(): string {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
