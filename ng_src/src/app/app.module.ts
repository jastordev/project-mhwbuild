import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { CoreModule } from './core.module'; // Core services
import { FeatureModule } from './feature.module'; // App features
import { MhSelectModule } from './shared/module/mh-select/mh-select.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ItemDetailComponent }
  from './shared/components/item-detail/item-detail.component';
import { ToastComponent } from './shared/components/toast/toast.component';

import { AuthInterceptor } from './shared/http-interceptors/auth-interceptor';
import { LoginComponent } from './shared/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ItemDetailComponent,
    LoginComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    FeatureModule,
    AppRoutingModule,
    HttpClientModule,
    MhSelectModule
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ItemDetailComponent, LoginComponent, ToastComponent]
})
export class AppModule { }
