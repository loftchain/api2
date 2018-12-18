import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './user/signup/signup.component';
import {LoginComponent} from './user/login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CurrencyComponent} from './currency/currency.component';
import {AddCurrencyComponent} from './currency/add-currency/add-currency.component';
import {EditCurrencyComponent} from './currency/edit-currency/edit-currency.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path: 'welcome', component: WelcomeComponent},
  {path: 'currencies', component: CurrencyComponent},
  {path: 'currencies/create', component: AddCurrencyComponent},
  {path: 'currencies/edit/:id', component: EditCurrencyComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
