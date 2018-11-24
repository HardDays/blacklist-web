import { MainService } from './../../_services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(protected service: MainService) { }

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
