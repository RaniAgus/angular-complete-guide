import { ViewContainerRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  // Recibe el template HTML y el contenedor de la Vista a modificar
  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  @Input() set appUnless(condition: boolean) {
    // Una función para ejecutar cada vez que cambie el valor que se recibe
    if(!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
