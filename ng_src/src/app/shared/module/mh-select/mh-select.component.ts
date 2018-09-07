import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../../models/skill.model';

@Component({
    selector:'mh-select',
    templateUrl: './mh-select.component.html',
    styleUrls: ['./mh-select.component.scss']
})
export class MhSelectComponent{

    @Input() options : Array<any>;
    @Input() optType : string;
    filteredOpts : Array<any>;
    selectedOpt : any;
    searchVal : string;
    expanded : boolean;

    constructor(){ }

    ngOnInit(){
        this.resetOptions();
    }

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
            this.resetOptions();
        }
    }

    private filterOptions(){
        if(this.searchVal == ''){
            this.resetOptions();
        } else {
            // Search differently depending on the option type
            switch(this.optType){
                case 'Skill':
                    this.filteredOpts = 
                        this.options.filter((opt : Skill) => 
                            opt.name.includes(this.searchVal) || opt.desc.includes(this.searchVal));
                    break;
                default:
                    this.filteredOpts = 
                        this.options.filter((opt : String) => opt.includes(this.searchVal));
                    break;
            }
        }
    }

    private resetOptions(){
        this.filteredOpts = this.options;
    }
}