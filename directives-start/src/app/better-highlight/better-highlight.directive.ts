import { ElementRef, HostListener } from '@angular/core';
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
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightyellow');
  }

  /* Si yo quiero hacer un 'hover', puedo: */

  // 'mouseenter' sería "cuando entra el mouse" (cuando se posa encima)
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightyellow');
  }

  // 'mouseleave' sería "cuando se va el mouse"
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'white');
  }

}
