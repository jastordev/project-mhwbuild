import { NgModule } from '@angular/core';

import { DOMService } from './shared/service/dom.service';
import { ModalService } from './shared/service/modal.service';
import { ToastService } from './shared/service/toast.service';
import { DataService } from './shared/service/data.service';
import { ItemDataService } from './shared/service/item-data.service';
import { ImageUploadService } from './shared/service/image-upload.service';

@NgModule({
  providers: [
    DOMService,
    ModalService,
    ToastService,
    ImageUploadService,
    DataService,
    ItemDataService ]
})
export class CoreModule { }
