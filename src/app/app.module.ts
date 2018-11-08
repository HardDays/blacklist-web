import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { HttpService } from './_services/http.service';
import { MainService } from './_services/main.service';
import { AuthMainService } from './_services/auth.service';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

// imports:[HttpClientModule, HttpModule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AuthModule,
    HomeModule
  ],
  providers: [
    HttpService,
    MainService,
    AuthMainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
