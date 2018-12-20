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
import {AddCustomerComponent} from './customer/add-customer/add-customer.component';
import {EditCustomerComponent} from './customer/edit-customer/edit-customer.component';
import {TransactionComponent} from './transaction/transaction.component';
import {AddTransactionComponent} from './transaction/add-transaction/add-transaction.component';
import {EditTransactionComponent} from './transaction/edit-transaction/edit-transaction.component';
import {LandingComponent} from './landing/landing.component';
import {AuthGuardService} from './user/auth-guard.service';
import {DeleteComponent} from './delete/delete.component';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardService] },
  { path: 'currencies', component: CurrencyComponent, canActivate: [AuthGuardService] },
  { path: 'currencies/create', component: AddCurrencyComponent, canActivate: [AuthGuardService] },
  { path: 'currencies/edit/:id', component: EditCurrencyComponent, canActivate: [AuthGuardService] },
  { path: 'currencies/delete', component: DeleteComponent, canActivate: [AuthGuardService] },
  { path: 'customers', component: CustomerComponent, canActivate: [AuthGuardService] },
  { path: 'customers/create', component: AddCustomerComponent, canActivate: [AuthGuardService] },
  { path: 'customers/edit/:id', component: EditCustomerComponent, canActivate: [AuthGuardService] },
  { path: 'customers/delete', component: DeleteComponent, canActivate: [AuthGuardService] },
  { path: 'transactions', component: TransactionComponent, canActivate: [AuthGuardService] },
  { path: 'transactions/create', component: AddTransactionComponent, canActivate: [AuthGuardService] },
  { path: 'transactions/edit/:id', component: EditTransactionComponent, canActivate: [AuthGuardService] },
  { path: 'transactions/delete', component: DeleteComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
