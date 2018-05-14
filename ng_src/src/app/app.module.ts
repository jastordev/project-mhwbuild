import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ItemsComponent } from './items/items.component'; //Replace by module

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ HttpClientModule],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
