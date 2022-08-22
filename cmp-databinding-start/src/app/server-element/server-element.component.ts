import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild,
} from '@angular/core';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
}) // Es una buena práctica incluir la interfaz si la estás implementando
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input()
  srvElement: { type: string; name: string; content: string };

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
    console.log(
      `Text content of paragraph: ${this.paragraph.nativeElement.textContent}`
    ); // 'Just a test!' tampoco aparece
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngDoCheck(): void {
    console.log('doCheck called!'); // No es un problema siempre y cuando el código que se ejecuta es chiquito
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!'); // Después de onInit y de doCheck, solo una vez
    console.log(
      `Text content of paragraph: ${this.paragraph.nativeElement.textContent}`
    ); // Acá sí se renderizó 'Just a test!'
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!'); // Siempre después de doCheck
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!'); // Después de ContentInit
    console.log(`Text content: ${this.header.nativeElement.textContent}`); // Acá sí se renderizó 'testserver'
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!'); // Después de ContentCheck
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy was called!');
  }
}
