import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { Skill } from '../../models/skill.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector:'mh-select',
    templateUrl: './mh-select.component.html',
    styleUrls: ['./mh-select.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MhSelectComponent),
        multi: true
    }]
})
export class MhSelectComponent implements ControlValueAccessor {

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

    private propagateChange = (_: any) => {};

    public writeValue(obj : any){
        if(obj) {
            this.selectedOpt = obj;
        }
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

    private selectOption(option : any){        
        this.selectedOpt = option;
        this.propagateChange(this.selectedOpt);
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