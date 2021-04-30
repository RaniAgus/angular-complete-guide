import { Directive, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
    @HostBinding('class.open') isOpen:boolean;

    constructor() { }

    ngOnInit() {
        this.isOpen = false;
    }

    @HostListener('click') toggleOpen(eventdata: Event) {
        this.isOpen = !this.isOpen;
    }
}