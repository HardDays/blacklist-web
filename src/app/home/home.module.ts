import { ImagesService } from './../_services/image.service';
import { AccountsService } from './../_services/accounts.service';
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
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { HumanListComponent } from './human-list/human-list.component';
import { VacancesComponent } from './vacances/vacances.component';
import { VacanceComponent } from './vacance/vacance.component';
import { HumanComponent } from './human/human.component';
import { MyVacancesComponent } from './my-vacances/my-vacances.component';
import { MyVacanceComponent } from './my-vacance/my-vacance.component';
import { MyMsgComponent } from './my-msg/my-msg.component';
import { PersonComponent } from './profile/person/person.component';
import { CompanyComponent } from './profile/company/company.component';
import { AvatarImageComponent } from './profile/avatar-image/avatar-image.component';
import { CreateBlackComponent } from './create-black/create-black.component';
import { BlackListItemComponent } from './black-list-item/black-list-item.component';
import { PayComponent } from './pay/pay.component';
import { BlacklistService } from '../_services/blacklist.service';
import { UiPaginationComponent } from './ui-pagination/ui-pagination.component';
import { AdminService } from '../_services/admin.service';
import { PaySuccessComponent } from './pay/pay-success/pay-success.component';
import { PayErrorComponent } from './pay/pay-error/pay-error.component';
import { NewsComponent } from './news/news.component';
import { NewItemComponent } from './news/new-item/new-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    BlackListComponent,
    NavbarComponent,
    ProfileComponent,
    HumanListComponent,
    VacancesComponent,
    VacanceComponent,
    HumanComponent,
    MyVacancesComponent,
    MyVacanceComponent,
    MyMsgComponent,
    PersonComponent,
    CompanyComponent,
    AvatarImageComponent,
    CreateBlackComponent,
    BlackListItemComponent,
    PayComponent,
    UiPaginationComponent,
    PaySuccessComponent,
    PayErrorComponent,
    NewsComponent,
    NewItemComponent
  ],
  providers: [
    MainService,
    AccountsService,
    ImagesService,
    BlacklistService,
    AdminService
  ]
})
export class HomeModule { }
