import { ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Directive, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input('appBetterHighlight')
  defaultColor: string = 'transparent';
  @Input()
  highlightColor: string = 'lightyellow';
  
  @HostBinding('style.backgroundColor') 
  bgColor: string; 

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // Usamos un nuevo parámetro de tipo Renderer2
  }

  ngOnInit() {
    // Mejor, así no accedemos directamente al ElementRef y prevenimos errores
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightyellow');
    this.bgColor = this.defaultColor;
  }

  /* Si yo quiero hacer un 'hover', puedo: */

  // 'mouseenter' sería "cuando entra el mouse" (cuando se posa encima)
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightyellow');
    this.bgColor = this.highlightColor;
  }

  // 'mouseleave' sería "cuando se va el mouse"
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.bgColor = this.defaultColor;
  }

}
