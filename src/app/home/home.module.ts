// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// import { NgxSmartModalModule } from '../_ui-components/ui-ngx-smart-modal/ngx-smart-modal.module';

// services
import { MainService } from '../_services/main.service';
import { HomeComponent } from './home.component';
import { BlackListComponent } from './black-list/black-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    BlackListComponent
  ],
  providers: [
    MainService
  ]
})
export class HomeModule { }
