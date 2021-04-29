import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked { // Es una buena práctica incluir la interfaz si la estás implementando
  @Input('srvElement') // Para definirlo como alias para esta propiedad desde fuera
  element: {type: string, name: string, content: string};

  @Input()
  name: string;

  constructor() {
    console.log('constructor called!');
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
  }

  ngOnChanges(changes: SimpleChanges):void {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngDoCheck() {
    console.log('doCheck called!'); // No es un problema siempre y cuando el código que se ejecuta es chiquito
  }

  ngAfterContentInit() {
    console.log('contentInit called!'); // Después de onInit y de doCheck, solo una vez
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!'); // Siempre después de doCheck
  }
}
