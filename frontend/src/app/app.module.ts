import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthHeaderInterceptor } from './user/auth.http.interceptor';
import { UserModule } from './user/user.module';
import { environment } from '../environments/environment';
import { WelcomeComponent } from './welcome/welcome.component';
import { ResourceModule } from './resource/resource.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CurrencyComponent } from './currency/currency.component';
import { DeleteComponent } from './delete/delete.component';
import { AddCurrencyComponent } from './currency/add-currency/add-currency.component';
import { CurrencyService } from './currency/currency.service';
import { AddCurrencyService } from './currency/add-currency/add-currency.service';
import { EditCurrencyComponent } from './currency/edit-currency/edit-currency.component';
import { CustomerComponent } from './customer/customer.component';
import { EditCurrencyService } from './currency/edit-currency/edit-currency.service';
import { CustomerService } from './customer/customer.service';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { AddCustomerService } from './customer/add-customer/add-customer.service';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { EditCustomerService } from './customer/edit-customer/edit-customer.service';
import { TransactionComponent } from './transaction/transaction.component';
import { EditTransactionComponent } from './transaction/edit-transaction/edit-transaction.component';
import { AddTransactionComponent } from './transaction/add-transaction/add-transaction.component';
import { AddTransactionService } from './transaction/add-transaction/add-transaction.service';
import { TransactionService } from './transaction/transaction.service';
import { LandingComponent } from './landing/landing.component';
import { AuthGuardService } from './user/auth-guard.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

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
    EditCurrencyComponent,
    CustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    TransactionComponent,
    EditTransactionComponent,
    AddTransactionComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    UserModule.forRoot(environment.api),
    ResourceModule.forRoot(environment.api),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    CurrencyService,
    AddCurrencyService,
    EditCurrencyService,
    CustomerService,
    AddCustomerService,
    EditCustomerService,
    TransactionService,
    AddTransactionService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
