import { MainService } from './../../_services/main.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  Pages = {
    'pay': 1,
    'success': 2,
    'error': 3,
  };

  Page = this.Pages.pay;

  constructor(protected service: MainService, protected router: Router) {
    if (router.url === '/pay/error') {
      this.Page = this.Pages.error;
    } else if (router.url === '/pay/success') {
      this.Page = this.Pages.success;
    }
  }

  ngOnInit() {
    // this.getForm();
  }

  pay() {
    this.service.authService.me.is_payed = true;
    this.service.authService.onMeChange$.next(true);
  }

  getForm() {
    // tslint:disable-next-line:max-line-length
    this.service.http.GetDataFromOtherUrl('https://auth.robokassa.ru/Merchant/PaymentForm/FormV.js?MerchantLogin=black_list&InvoiceID=0&Culture=ru&Encoding=utf-8&OutSum=100&SignatureValue=26c8359221244aa536a4741029c577bb')
      .subscribe(
        (res) => {
          console.log(res);
        }
      );
  }

}
