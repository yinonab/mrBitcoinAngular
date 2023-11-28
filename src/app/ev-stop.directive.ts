import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appEvStop]'
})
export class EvStopDirective {

  constructor() { }

    @HostListener('click', ['$event'])
    onClick(ev: MouseEvent) {
        ev.stopPropagation()
    }

}