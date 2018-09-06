import { Directive, ElementRef, Output, HostListener } from '@angular/core';
import { EventEmitter } from 'events';

// Code obtained from 
// https://christianliebel.com/2016/05/angular-2-a-simple-click-outside-directive/
@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef : ElementRef) {
        // By injecting ElemRef we can get a ref to the DOM Element
    }

    // We make the EventEmitter visible by using @Output
    @Output()
    public clickOutside = new EventEmitter();

    // HostListener listens for events on the host (the DOM elem the directive is on)
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElem){
        const clickedInside = this._elementRef.nativeElement.contains(targetElem);
        if (!clickedInside) { this.clickOutside.emit(null)}    
    }

}