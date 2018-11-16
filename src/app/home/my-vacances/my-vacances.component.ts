import { Vacancie } from './../../_models/auth.interface';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-my-vacances',
  templateUrl: './my-vacances.component.html',
  styleUrls: ['./my-vacances.component.css']
})
export class MyVacancesComponent implements OnInit {

  MyId = 0;
  Vacancies: Vacancie[] = [];
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
              this.Vacancies.push(item);
            }
          }
          console.log(this.Vacancies);
        }
      );
  }

}
