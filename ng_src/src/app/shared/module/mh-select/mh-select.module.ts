import { NgModule } from '@angular/core';

import { MhSelectComponent } from './mh-select.component';
import { CommonModule } from '../../../../../node_modules/@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@NgModule({
    imports: [
        CommonModule
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