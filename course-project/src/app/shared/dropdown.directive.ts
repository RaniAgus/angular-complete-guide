import { Directive, ElementRef, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
    @HostBinding('class.open')
    isOpen: boolean = false;

    constructor(private elementRef: ElementRef) { } // Recibimos la referencia al elemento

    ngOnInit() { }

    // Recibimos el evento click desde cualquier parte del documento
    @HostListener('click', ['$event']) 
    toggleOpen($event: Event) {
        this.isOpen = !this.isOpen;
    }
}