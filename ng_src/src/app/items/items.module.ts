import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ItemsRoutingModule } from './items-routing.module';

import { ItemsComponent } from './items.component';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule
  ],
  declarations: [
    ItemsComponent
  ]
})
export class ItemsModule { }
