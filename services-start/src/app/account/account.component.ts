import { Component, Input } from '@angular/core';

import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService] // Así Angular construye el componente para pasárnoslo
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  // Así le avisamos a Angular que nos inyecte una instancia de este servicio
  constructor(private accountsService: AccountsService) { }

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status); // No hace falta, quedó en el otro servicio
    this.accountsService.statusUpdated.emit(status);
  }
}
