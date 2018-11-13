import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './items.component';

const routes: Routes = [
  { path: 'items/mats', component: ItemsComponent },
  { path: 'items/deco', component: ItemsComponent },
  { path: 'items/ammo', component: ItemsComponent },
  { path: 'items/tools', component: ItemsComponent },
  { path: 'items/misc', component: ItemsComponent },
  { path: 'items', redirectTo: 'items/mats' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
