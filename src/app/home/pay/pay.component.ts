import { MainService } from './../../_services/main.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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

  Pay: any;

  constructor(protected service: MainService, protected router: Router, protected sanitizer: DomSanitizer) {
    if (router.url === '/pay/fail') {
      this.Page = this.Pages.error;
    } else if (router.url === '/pay/success') {
      this.Page = this.Pages.success;
      this.pay();
    }
  }

  photoURL(url) {
    if (this.Pay) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url + '&Shp_item=' + this.Pay['shp_item']);
    }
    return '';
  }
  // getUrl() {
  //   return this.photoURL(
  //   // tslint:disable-next-line:max-line-length

  //   );
  // }

//   <?
//   $mrh_login = "Test1999";
//   $mrh_pass1 = "password_1";
//   $inv_id = 678678;
//   $inv_desc = "Товары для животных";
//   $out_summ = "100.00";
//   $IsTest = 1;
//   $crc = md5("$mrh_login:$out_summ:$inv_id:$mrh_pass1");
//   print "<html><script language=JavaScript ".
//       "src='https://auth.robokassa.ru/Merchant/PaymentForm/FormMS.js?".
//       "MerchantLogin=$mrh_login&OutSum=$out_summ&InvoiceID=$inv_id".
//       "&Description=$inv_desc&SignatureValue=$crc&IsTest=$IsTest'></script></html>";
// ?>

  ngOnInit() {
    if (this.service.authService.me) {
      this.getPayment();
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
       this.getPayment();
      }
    );
    // this.getForm();
  }

  getPayment() {
    this.service.accService.GetPaymentData(this.service.authService.me.id)
      .subscribe(
        (res) => {
          console.log(res);
          this.Pay = res;
        }
      );
  }

  pay() {
    // this.service.authService.me.is_payed = true;

    this.service.authService.GetMe()
      .subscribe(
        (res) => {
          this.service.authService.onMeChange$.next(true);
        }
      );
  }

  onSubmit(data) {
    console.log(data);
    this.service.http.PostDataToOtherUrl(this.Pay['mrh_url'], data)
      .subscribe(
        (res) => {
          console.log(`ok`, res);
        },
        (err) => {
          console.log(`err`, err);
        }
      );
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
