import { Directive, ElementRef, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
    @HostBinding('class.open') isOpen:boolean = false;

    constructor(private elementRef: ElementRef) { } // Recibimos la referencia al elemento

    ngOnInit() { }

    // Recibimos el evento click desde cualquier parte del documento
    @HostListener('document:click', ['$event']) toggleOpen(eventdata: Event) {
        this.isOpen = this.elementRef
            .nativeElement               // Si el elemento HTML que tiene esta directiva
            .contains(eventdata.target)  // contiene al elemento al que se hizo click,
            ? !this.isOpen               // se abre o cierra dependiendo de si ya estaba abierto.
            : false;                     // Sino, se hizo click afuera, entonces siempre se cierra.
    }
}