import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { HomeModule } from './home/home.module';
import { ItemsModule } from './items/items.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DataService } from './shared/service/data.service';
import { ItemDataService } from './shared/service/item-data.service';

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
  providers: [ HttpClientModule, DataService, ItemDataService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
