import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      // Toma la clave 'server' que definimos en los routes
      this.server = data['server'];
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { 
      relativeTo: this.route,
      queryParamsHandling: 'preserve' // Esto me deja preservar los query params que recibí
    });
  }

}
