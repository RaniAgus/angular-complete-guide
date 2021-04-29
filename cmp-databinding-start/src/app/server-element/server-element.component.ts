import { Component
       , OnInit
       , Input
       , OnChanges
       , SimpleChanges
       , DoCheck
       , AfterContentInit
       , AfterContentChecked
       , AfterViewInit
       , AfterViewChecked
       , OnDestroy
       , ViewChild
       , ElementRef
       , ContentChild
       } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit // Es una buena práctica incluir la interfaz si la estás implementando
                                             , OnChanges
                                             , DoCheck
                                             , AfterContentInit
                                             , AfterContentChecked
                                             , AfterViewInit
                                             , AfterViewChecked
                                             , OnDestroy
{
  @Input('srvElement') // Para definirlo como alias para esta propiedad desde fuera
  element: {type: string, name: string, content: string};

  @Input()
  name: string;

  @ViewChild('heading', { static: true })
  header: ElementRef;

  @ContentChild('contentParagraph', { static: true })
  paragraph: ElementRef;

  constructor() {
    console.log('constructor called!');
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log(`Text content: ${this.header.nativeElement.textContent}`); // Acá 'testserver' no aparece
    console.log(`Text content of paragraph: ${this.paragraph.nativeElement.textContent}`); // 'Just a test!' tampoco aparece
  }

  ngOnChanges(changes: SimpleChanges):void {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngDoCheck() {
    console.log('doCheck called!'); // No es un problema siempre y cuando el código que se ejecuta es chiquito
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called!'); // Después de onInit y de doCheck, solo una vez
    console.log(`Text content of paragraph: ${this.paragraph.nativeElement.textContent}`); // Acá sí se renderizó 'Just a test!'
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!'); // Siempre después de doCheck
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called!'); // Después de ContentInit
    console.log(`Text content: ${this.header.nativeElement.textContent}`); // Acá sí se renderizó 'testserver'
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called!'); // Después de ContentCheck
  }

  ngOnDestroy() {
    console.log('ngOnDestroy was called!');
  }
}
