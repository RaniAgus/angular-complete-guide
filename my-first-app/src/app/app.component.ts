import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Este es el selector que se usa en index.html para inyectar este componente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Agus';
}
