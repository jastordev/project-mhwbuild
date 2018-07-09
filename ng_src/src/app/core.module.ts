import { NgModule } from '@angular/core';

import { DOMService } from './shared/service/dom.service';
import { ModalService } from './shared/service/modal.service';
import { ToastService } from './shared/service/toast.service';
import { DataService } from './shared/service/data.service';
import { ItemDataService } from './shared/service/item-data.service';


@NgModule({
  providers: [
    DOMService,
    ModalService,
    ToastService,
    DataService,
    ItemDataService ]
})
export class CoreModule { }
