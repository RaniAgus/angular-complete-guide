import { Injectable } from "@angular/core";

// Esta es la forma 'moderna' de inyectar la misma instancia del servicio en AppModule
@Injectable({providedIn: 'root'})
export class LoggingService {
    logStatusChange(status: string) {
        console.log(`A server status changed, new status: ${status}`);
    }
}