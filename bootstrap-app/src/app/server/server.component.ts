import { Component } from "@angular/core";

@Component({ // Component decorator
    selector: 'app-server', // The HTML tag 'app-x'
    templateUrl: './server.component.html' // El path (relativo) hacia el template HTML
})
export class ServerComponent {
    serverId:number = 12;
    serverStatus:string = 'offline';

    getServerStatus():string {
        return this.serverStatus;
    }
}