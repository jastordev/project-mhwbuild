import { Component, Input } from '@angular/core';

@Component({
    selector:'mh-select',
    templateUrl: './mh-select.component.html',
    styleUrls: ['./mh-select.component.scss']
})
export class MhSelectComponent{

    @Input() options : any[];
    selectedOpt : any;
    expanded : boolean;

    constructor(){ }

    private selectOption(option : any){        
        this.selectedOpt = option;
        this.expanded = false;        
    }
}