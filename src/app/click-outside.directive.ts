import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private el: ElementRef) { }

    @Output() appClickOutside = new EventEmitter()

    @HostListener('document:click', ['$event'])
    onClick(ev: MouseEvent) {
        const isClickedInside = this.el.nativeElement.contains(ev.target)
        console.log('isClickedInside:', isClickedInside)
        if (!isClickedInside) this.appClickOutside.emit()
    }

}
