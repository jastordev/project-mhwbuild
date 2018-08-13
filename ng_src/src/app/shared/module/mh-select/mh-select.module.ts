import { NgModule } from '@angular/core';

import { MhSelectComponent } from './mh-select.component';
import { CommonModule } from '../../../../../node_modules/@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MhSelectComponent
    ],
    declarations: [
        MhSelectComponent
    ]
})
export class MhSelectModule { }