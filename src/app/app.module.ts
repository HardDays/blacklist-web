import { BlacklistService } from './_services/blacklist.service';
import { ImagesService } from './_services/image.service';
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
import { AccountsService } from './_services/accounts.service';
import { AdminService } from './_services/admin.service';
import { PreloaderComponent } from './preloader/preloader.component';

// imports:[HttpClientModule, HttpModule

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent
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
    AuthMainService,
    ImagesService,
    AccountsService,
    BlacklistService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
