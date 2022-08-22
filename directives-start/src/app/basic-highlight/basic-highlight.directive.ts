import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]', // Los corchetes son un agregado
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
    // Se agrega la referencia en el constructor
    // Es ElementRef, como @ViewChild
  }

  ngOnInit(): void {
    // Se le puede setear, por ejemplo, un estilo
    this.elementRef.nativeElement.style.backgroundColor = 'lightblue';
  }
}
