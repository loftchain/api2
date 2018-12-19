import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './user/signup/signup.component';
import {LoginComponent} from './user/login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CurrencyComponent} from './currency/currency.component';
import {AddCurrencyComponent} from './currency/add-currency/add-currency.component';
import {EditCurrencyComponent} from './currency/edit-currency/edit-currency.component';
import {CustomerComponent} from './customer/customer.component';
import {AddCustomerComponent} from "./customer/add-customer/add-customer.component";
import {EditCustomerComponent} from "./customer/edit-customer/edit-customer.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent }
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'currencies', component: CurrencyComponent },
  { path: 'currencies/create', component: AddCurrencyComponent },
  { path: 'currencies/edit/:id', component: EditCurrencyComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/create', component: AddCustomerComponent },
  { path: 'customers/edit/:id', component: EditCustomerComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
