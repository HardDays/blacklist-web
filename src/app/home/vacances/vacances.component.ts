import { Vacancie } from './../../_models/auth.interface';
import { MainService } from './../../_services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacances',
  templateUrl: './vacances.component.html',
  styleUrls: ['./vacances.component.css']
})
export class VacancesComponent implements OnInit {

  Vacancies: Vacancie[] = [];
  AllVacanciesCount = 0;
  // tslint:disable-next-line:no-inferrable-types
  Page: number = 1;
  TextSearch = '';
  constructor(protected service: MainService) { }

  ngOnInit() {
    this.service.accService.GetVacancies(this.Page)
      .subscribe(
        (res) => {
          this.Vacancies = res.items;
          console.log(this.Vacancies.length, res.count, this.Page);

          this.AllVacanciesCount = res.count;
        }
      );
  }

  search() {
    this.service.accService.GetVacancies(this.Page, this.TextSearch)
      .subscribe(
        (res) => {
          this.Vacancies = [];
          this.Vacancies = res.items;
          this.AllVacanciesCount =  this.Vacancies.length < 10 && this.Page === 1 ? this.Vacancies.length : res.count;
        }
      );
  }

}
