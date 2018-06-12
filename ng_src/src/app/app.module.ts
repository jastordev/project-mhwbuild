import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { HomeModule } from './home/home.module';
import { ItemsModule } from './items/items.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DOMService } from './shared/service/dom.service';
import { ModalService } from './shared/service/modal.service';
import { DataService } from './shared/service/data.service';
import { ItemDataService } from './shared/service/item-data.service';

import { ItemDetailComponent } 
  from './shared/components/ItemDetail/item-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HomeModule,
    ItemsModule,
    AppRoutingModule,
    HttpClientModule    
  ],
  providers: [ HttpClientModule, DOMService, ModalService,
     DataService, ItemDataService],
  bootstrap: [ AppComponent ],
  entryComponents: [ ItemDetailComponent ]
})
export class AppModule { }
