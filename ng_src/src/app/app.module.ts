import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { HomeModule } from './home/home.module';
import { ItemsModule } from './items/items.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DOMService } from './shared/service/dom.service';
import { ModalService } from './shared/service/modal.service';
import { DataService } from './shared/service/data.service';
import { ItemDataService } from './shared/service/item-data.service';
import { ToastService } from './shared/service/toast.service';

import { ItemDetailComponent } 
  from './shared/components/item-detail/item-detail.component';
import { AuthInterceptor } from './shared/http-interceptors/auth-interceptor';
import { ToastComponent } from './shared/components/toast/toast.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ItemDetailComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HomeModule,
    ItemsModule,
    AppRoutingModule,
    HttpClientModule    
  ],
  providers: [
    HttpClientModule,
    DOMService,
    ModalService,
    ToastService,
    DataService,
    ItemDataService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ ItemDetailComponent, ToastComponent ]
})
export class AppModule { }
