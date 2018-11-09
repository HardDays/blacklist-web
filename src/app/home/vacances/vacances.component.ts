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
  constructor(protected service: MainService) { }

  ngOnInit() {
    this.service.accService.GetVacancies()
      .subscribe(
        (res) => {
          this.Vacancies = res;
        }
      );
  }

  search(text: string) {
    this.service.accService.GetVacancies(text)
      .subscribe(
        (res) => {
          this.Vacancies = [];
          this.Vacancies = res;
        }
      );
  }

}
