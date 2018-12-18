import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthHeaderInterceptor} from './user/auth.http.interceptor';
import { UserModule } from './user/user.module';
import {environment} from '../environments/environment';
import { WelcomeComponent } from './welcome/welcome.component';
import {ResourceModule} from './resource/resource.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CurrencyComponent } from './currency/currency.component';
import { DeleteComponent } from './delete/delete.component';
import { AddCurrencyComponent } from './currency/add-currency/add-currency.component';
import {CurrencyService} from './currency/currency.service';
import {AddCurrencyService} from './currency/add-currency/add-currency.service';
import { EditCurrencyComponent } from './currency/edit-currency/edit-currency.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    CurrencyComponent,
    DeleteComponent,
    AddCurrencyComponent,
    EditCurrencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule.forRoot(environment.api),
    ResourceModule.forRoot(environment.api)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    CurrencyService,
    AddCurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
