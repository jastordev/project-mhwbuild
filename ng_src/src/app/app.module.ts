import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { HomeModule } from './home/home.module';
import { ItemsModule } from './items/items.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DataService } from './shared/service/data.service';
import { ItemService } from './shared/service/item.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    ItemsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ HttpClientModule, DataService, ItemService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
