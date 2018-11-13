import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { ItemsModule } from './items/items.module';

@NgModule({
  imports: [
    HomeModule,
    ItemsModule ]
})
export class FeatureModule { }
