import { AbstractControl } from '@angular/forms';

/*
* Custom validators relating to Items.   
*/

export function validateType(control : AbstractControl){
    let types = ["Material", "Consumable/Misc",
    "Specialized Tool", "Decoration", "Ammo/Coating"];
    
    if(!types.includes(control.value) || control.value == null){
        return { validType : true };
    }
    return null;
}