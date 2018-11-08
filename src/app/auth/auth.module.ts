import { AuthMainService } from './../_services/auth.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

// services
import {  MainService } from '../_services/main.service';

// components

import { AuthComponent } from './auth.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PagePasswordResetComponent } from './page-password-reset/page-password-reset.component';
import { HttpService } from '../_services/http.service';




@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    // ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    PageLoginComponent,
    PageRegisterComponent,
    PagePasswordResetComponent
  ],
  providers: [
    HttpService,
    MainService,
    AuthMainService
  ]
})
export class AuthModule { }
