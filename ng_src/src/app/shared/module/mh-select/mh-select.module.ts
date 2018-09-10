import { NgModule, forwardRef } from '@angular/core';

import { MhSelectComponent } from './mh-select.component';
import { CommonModule } from '../../../../../node_modules/@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FormsModule } from '../../../../../node_modules/@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        MhSelectComponent
    ],
    declarations: [
        MhSelectComponent,
        ClickOutsideDirective
    ]    
})
export class MhSelectModule { }