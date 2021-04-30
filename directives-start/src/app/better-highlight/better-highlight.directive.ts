import { ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Directive, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // Usamos un nuevo parámetro de tipo Renderer2
  }

  ngOnInit() {
    // Mejor, así no accedemos directamente al ElementRef y prevenimos errores
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightyellow');
  }

}
