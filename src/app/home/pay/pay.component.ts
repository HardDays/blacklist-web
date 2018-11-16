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
  }

  pay() {
    this.service.authService.me.is_payed = true;
    this.service.authService.onMeChange$.next(true);
  }

}
