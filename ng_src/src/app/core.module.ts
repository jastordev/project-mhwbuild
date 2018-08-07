import { NgModule } from '@angular/core';

import { DOMService } from './shared/service/dom.service';
import { ModalService } from './shared/service/modal.service';
import { ToastService } from './shared/service/toast.service';
import { DataService } from './shared/service/data.service';
import { ItemDataService } from './shared/service/data/item-data.service';
import { SkillDataService } from './shared/service/data/skill-data.service';
import { ImageValidationService } from './shared/service/image-validation.service';

@NgModule({
  providers: [
    DOMService,
    ModalService,
    ToastService,
    ImageValidationService,
    SkillDataService,
    ItemDataService,
    DataService
   ]
})
export class CoreModule { }
