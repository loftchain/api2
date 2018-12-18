import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
import { TokenStorage } from './token.storage';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {ApiUrl} from './api-url';
import { LoginService } from './login.service';
import {UserService} from './user.service';
import {UserStore} from './user.store';

@NgModule({
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatCardModule, HttpClientModule],
  declarations: [SignupComponent, LoginComponent],
  exports: [SignupComponent, LoginComponent]
})
export class UserModule {
  static forRoot(apiUrl: string) {
    return {
      ngModule: UserModule,
      providers: [
        {
          provide: ApiUrl,
          useValue: apiUrl
        },
        TokenStorage,
        LoginService,
        UserService,
        UserStore
      ]
    };
  }
}
