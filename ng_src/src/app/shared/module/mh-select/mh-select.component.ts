import { Component, Input } from '@angular/core';

@Component({
    selector:'mh-select',
    templateUrl: './mh-select.component.html',
    styleUrls: ['./mh-select.component.scss']
})
export class MhSelectComponent{

    @Input() options : any[];
    selectedOpt : any;
    searchVal : string;
    expanded : boolean;

    constructor(){ }

    private selectOption(option : any){        
        this.selectedOpt = option;
        this.expandOptions(false);        
    }

    private expandOptions(expand : boolean){
        if(expand){
            this.expanded = true;
        } else {
            this.expanded = false;
            this.searchVal = '';
        }
    }
}