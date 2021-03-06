import { NewAddComponent } from './home/news/new-add/new-add.component';
import { NewItemComponent } from './home/news/new-item/new-item.component';
import { PageHomeComponent } from './auth/page-home/page-home.component';
import { PayErrorComponent } from './home/pay/pay-error/pay-error.component';
import { PaySuccessComponent } from './home/pay/pay-success/pay-success.component';
import { PayComponent } from './home/pay/pay.component';
import { PayGuard } from './_guards/pay.guard';
import { BlackListItemComponent } from './home/black-list-item/black-list-item.component';
import { CreateBlackComponent } from './home/create-black/create-black.component';
import { BlackListComponent } from './home/black-list/black-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AuthPageGuard } from './_guards/authpage.guard';
import { AuthComponent } from './auth/auth.component';
import { PageLoginComponent } from './auth/page-login/page-login.component';
import { PageRegisterComponent } from './auth/page-register/page-register.component';
import { PagePasswordResetComponent } from './auth/page-password-reset/page-password-reset.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileComponent } from './home/profile/profile.component';
import { HumanListComponent } from './home/human-list/human-list.component';
import { VacancesComponent } from './home/vacances/vacances.component';
import { HumanComponent } from './home/human/human.component';
import { VacanceComponent } from './home/vacance/vacance.component';
import { MyVacancesComponent } from './home/my-vacances/my-vacances.component';
import { MyVacanceComponent } from './home/my-vacance/my-vacance.component';
import { MyMsgComponent } from './home/my-msg/my-msg.component';
import { NewsComponent } from './home/news/news.component';
import { SbComponent } from './home/sb/sb.component';

// resolvers
// import { UserResolver } from './_resolvers/user.resolver';
// import { NewDealResolver } from './_resolvers/new-deal.resolver';
// import { OfferListResolver } from './_resolvers/offer-list.resolver';
// import { BankPaymentResolver } from './_resolvers/bank-payment.resolver';
// import { CryptoPaymentResolver } from './_resolvers/crypto-payment.resolver';
// import { PaymentSystemResolver } from './_resolvers/payment-systems.resolver';

// import { UserOfferResolver } from './_resolvers/user-offer.resolver';
// import { Market1Resolver } from './_resolvers/market1.resolver';
// import { Market2Resolver } from './_resolvers/market2.resolver';
// import { Market3Resolver } from './_resolvers/market3.resolver';

// import { DealListResolver } from './_resolvers/deal-list.resolver';
// import { UserDealResolver } from './_resolvers/user-deal.resolver';
// import { DashboardResolver } from './_resolvers/dashboard.resolver';
// import { BreakResolver } from './_resolvers/break.resolver';

// // modules
// import { AuthModule } from './auth/auth.module';

// // guards
// import { AuthGuard } from './_guards/auth.guard';
// import { AuthPageGuard } from './_guards/authpage.guard';
// import { BreakGuard } from './_guards/break.guard';

// import { HomeComponent } from './home/home.component';
// import { PageDashboardComponent } from './home/page-dashboard/page-dashboard.component';
// import { PageMarketComponent } from './home/page-market/page-market.component';
// import { PageProfileComponent } from './home/page-profile/page-profile.component';

// import { Page1MarketComponent } from './home/page-market/page1-market/page1-market.component';
// import { Page2DirectionComponent } from './home/page-market/page2-direction/page2-direction.component';
// import { Page3OfferComponent } from './home/page-market/page3-offer/page3-offer.component';
// import { Page4NewDealComponent } from './home/page-market/page4-new-deal/page4-new-deal.component';

// import { PagePaymentsComponent } from './home/page-payments/page-payments.component';
// import { PageRegistrationComponent } from './auth/page-registration/page-registration.component';
// import { PageLoginComponent } from './auth/page-login/page-login.component';
// import { PageRecoveryComponent } from './auth/page-recovery/page-recovery.component';

// import { PageUiKitComponent } from './home/page-ui-kit/page-ui-kit.component';
// import { PageTradingComponent } from './home/page-trading/page-trading.component';
// import { PageOfferCreateComponent } from './home/page-offer/page-offer-create/page-offer-create.component';

// import { PageOfferListComponent } from './home/page-offer/page-offer-list/page-offer-list.component';
// import { TestingComponent } from './home/testing/testing.component';
// import { PageOfferComponent } from './home/page-offer/page-offer.component';
// import { AuthComponent } from './auth/auth.component';

// import { PageDealListComponent } from './home/page-trading/page-deal-list/page-deal-list.component';
// import { PageDealComponent } from './home/page-trading/page-deal/page-deal.component';
// import { PageOfferEditComponent } from './home/page-offer/page-offer-edit/page-offer-edit.component';
// import { PagePasswordResetComponent } from './auth/page-password-reset/page-password-reset.component';

// import { PagePasswordResetTwofaComponent } from './auth/page-password-reset-twofa/page-password-reset-twofa.component';
// import { PageBreakComponent } from './auth/page-break/page-break.component';
// import { PageCreateMultisigComponent } from './home/page-payments/page-create-multisig/page-create-multisig.component';
// import { PagePaymentListComponent } from './home/page-payments/page-payment-list/page-payment-list.component';

// import { DealListNewResolver } from './_resolvers/deal-list-new.resolver';
// import { DealListActiveResolver } from './_resolvers/deal-list-active.resolver';
// import { DealListClosedResolver } from './_resolvers/deal-list-closed.resolver';
// import { WalletResolver } from './_resolvers/wallet.resolver';


// export function loadAuthModule() { return AuthModule; }

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthPageGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: PageLoginComponent },
      { path: 'register', component: PageRegisterComponent },
      { path: 'password-reset', component: PagePasswordResetComponent },
      { path: '**', redirectTo: 'login' }
    ]
  },
  {
    path: 'home',
    component: PageHomeComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'pay',
        component: PayComponent,
        children: [
          { path: 'success', component: PaySuccessComponent},
          { path: 'fail', component: PayErrorComponent}
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        // children:
        // [
        //   { path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]},
        //   { path: 'human-list', component: HumanListComponent,  canActivate: [AuthGuard]},
        //   { path: 'vacances', component: VacancesComponent,  canActivate: [AuthGuard]}
        // ]
        // resolve: {
        //   deals: DashboardResolver,
        //   newDeals: DealListNewResolver,
        //   activeDeals: DealListActiveResolver,
        //   closedDeals: DealListClosedResolver,
        //   user: UserResolver,
        //   cryptoPayments: CryptoPaymentResolver,
        //   bankPayments: BankPaymentResolver
        // }
      },
      {
        path: 'human-list',
        // canActivate: [PayGuard],
        component: HumanListComponent
      },
      {
        path: 'vacances',
        // canActivate: [PayGuard],
        component: VacancesComponent
      },
      {
        path: 'human/:id',
        canActivate: [PayGuard],
        component: HumanComponent
      },
      {
        path: 'vacance/:id',
        // canActivate: [PayGuard],
        component: VacanceComponent
      },
      {
        path: 'my-vacances',
        canActivate: [PayGuard],
        component: MyVacancesComponent
      },
      {
        path: 'my-vacances/:id',
        canActivate: [PayGuard],
        component: MyVacanceComponent
      },
      {
        path: 'my-msg',
        canActivate: [PayGuard],
        component: MyMsgComponent
      },
      {
        path: 'black-list',
        canActivate: [PayGuard],
        component: BlackListComponent
      },
      {
        path: 'black-list/:id',
        canActivate: [PayGuard],
        component: BlackListItemComponent
      },
      {
        path: 'create-list-item',
        component: CreateBlackComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'news/:id',
        component: NewItemComponent
      },
      {
        path: 'news-add',
        component: NewAddComponent
      },
      {
        path: 'sb',
        component: SbComponent
      },

  //     { path: '', redirectTo: 'shows', pathMatch:'full'},
  // { path:'',component:SystemComponent,
  //     { path: 'profile/:id', component: ProfileComponent, canActivate: [SystemAccessGuard]},
  //     { path: 'events', component: EventsComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'eventCreate/:id', component: EventCreateComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'fanCreate/:id', component: FanCreateComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'artistCreate/:id', component: ArtistCreateComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'venueCreate/:id', component: VenueCreateComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'feed', component: FeedComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'tickets', component: TicketsComponent, canActivate: [SystemAccessGuard] },
  //     // { path: 'shows_detail/:id', component: ShowsDetailComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'shows_detail/:id', loadChildren: './showsDetail/showsDetail.module#ShowsDetailModule', canActivate: [SystemAccessGuard] },

  //     { path: 'tickets/:id', component: MyTicketOpenedComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'messages', component: MessagesComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'settings', component: SettingsComponent, canActivate: [SystemAccessGuard] },
  //     { path: 'search', component: GlobalSearchComponent }
  //   ]
  // }
      // {
      //   path: 'market',
      //   component: PageMarketComponent,
      //   children: [
      //     {
      //       path: '',
      //       component: Page1MarketComponent,
      //       resolve: { markets: Market1Resolver }
      //     },
      //     {
      //       path: 'newdeal/:offer',
      //       component: Page4NewDealComponent,
      //       tslint:disable-next-line:max-line-length
      //       resolve: { offer: NewDealResolver, cryptoPayments: CryptoPaymentResolver, bankPayments: BankPaymentResolver, user: UserResolver }
      //     },
      //     {
      //       path: ':sell',
      //       component: Page2DirectionComponent,
      //       resolve: { directions: Market2Resolver }
      //     },
      //     {
      //       path: ':sell/:buy/:ticker',
      //       runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      //       component: Page3OfferComponent,
      //       resolve: { offers: Market3Resolver }
      //     },
      //   ]
      // },
      { path: '**', redirectTo: 'profile' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  providers: [
    // UserResolver,
    // NewDealResolver,
    // OfferListResolver,
    // UserOfferResolver,
    // BankPaymentResolver,
    // CryptoPaymentResolver,
    // PaymentSystemResolver,
    // Market1Resolver,
    // Market2Resolver,
    // Market3Resolver,
    // DealListResolver,
    // UserDealResolver,
    // DashboardResolver,
    // BreakResolver,
    // DealListNewResolver,
    // DealListActiveResolver,
    // DealListClosedResolver,
    // WalletResolver
  ]
})
export class AppRoutingModule { }

