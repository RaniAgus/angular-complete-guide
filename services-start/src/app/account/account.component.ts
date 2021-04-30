import { Component, Input } from '@angular/core';

import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService, AccountsService] // Así Angular construye el componente para pasárnoslo
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  // Así le avisamos a Angular que nos inyecte una instancia de este servicio
  constructor(private loggingService: LoggingService, private accountsService: AccountsService) { }

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
