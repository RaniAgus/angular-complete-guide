import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // Tenemos:
    // this.route.snapshot.fragment
    // this.route.fragment.subscribe(...)


    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.params.subscribe(params => {
      this.server = this.serversService.getServer(+params['id']);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    })

    this.allowEdit = this.route.snapshot.queryParams['allowEdit'] === '1';
    this.route.queryParams.subscribe(queryParams => {
      this.allowEdit = queryParams['allowEdit'] === '1';
    })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate() {
    if(!this.allowEdit) {
      return true;
    }

    if (this.serverWasChanged()) {
      return confirm('Do you want to discard the changes?');
    }

    return true;
  }

  serverWasChanged() {
    return !this.changesSaved
      && (this.serverName !== this.server.name
      || this.serverStatus !== this.server.status)
  }
}
