import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  // paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // Agrego esto para escuchar cambios en los params de la ruta en caso de que
    // haya un link que me mande al mismo componente
    // this.paramsSubscription =
    this.route.params.subscribe(
      (params: Params) => {
        this.user = {
          id: params['id'],
          name: params['name']
        };
      }
    );
  }

  ngOnDestroy(): void {
    // Angular lo hace por mí, no hace falta esto!!
    // this.paramsSubscription.unsubscribe();
  }

}
