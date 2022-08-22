import { Component } from '@angular/core';

import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService] // No está AccountsService porque tenemos que recibir el mismo que tiene el padre
})
export class NewAccountComponent {
  constructor(private accountsService: AccountsService) {
    this.accountsService.statusUpdated.subscribe((status: string) =>
      alert('new status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string): void {
    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus); // No hace falta, quedó en el otro servicio
  }
}
