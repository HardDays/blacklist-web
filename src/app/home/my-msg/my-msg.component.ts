import { Component, OnInit } from '@angular/core';
import { Vacancie } from 'src/app/_models/auth.interface';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-my-msg',
  templateUrl: './my-msg.component.html',
  styleUrls: ['./my-msg.component.css']
})
export class MyMsgComponent implements OnInit {

  MyId = 0;
  myVacancies: Vacancie[] = [];
  Responses: any[] = [];
  Page = 1;
  constructor(protected service: MainService) { }

  ngOnInit() {
    if (this.service.authService.me) {
      this.MyId = this.service.authService.me.id;
      this.GetMyVacancies();
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
        this.MyId = this.service.authService.me.id;
        this.GetMyVacancies();
      }
    );
  }

  GetMyVacancies() {
    this.service.accService.GetVacancies(this.Page)
      .subscribe(
        (res: Vacancie[]) => {
          for (const item of res) {
            if (item.company_id === this.MyId) {
              this.myVacancies.push(item);
            }
          }
          this.getResponses();
        }
      );
  }

  getResponses() {
    for (const item of this.myVacancies) {
      this.service.accService.GetResponseVacancies(item.id)
        .subscribe(
          (res) => {
            this.Responses.push(res);
            console.log(this.Responses);
          }
        );
    }
    console.log(`Responses = `, this.Responses);
  }

}
