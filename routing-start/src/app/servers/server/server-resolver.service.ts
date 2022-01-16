import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

export interface Server {
  id: number;
  name: string;
  status: string
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    // No hace falta el observable, este código se ejecuta siempre que se quiera
    // acceder a una ruta distinta!
    return this.serversService.getServer(+route.params['id']);
  }
}