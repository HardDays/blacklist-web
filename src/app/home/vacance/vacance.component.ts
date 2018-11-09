import { Vacancie } from './../../_models/auth.interface';
import { MainService } from './../../_services/main.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacance',
  templateUrl: './vacance.component.html',
  styleUrls: ['./vacance.component.css']
})
export class VacanceComponent implements OnInit {

  Id = 0;
  Vacancie: Vacancie = {
    id: 0,
    company_id: 0,
    company_name: '',
    position: '',
    salary: '',
    description: '',
    min_experience: 0
  };
  reqSended = false;
  MyType = '';
  constructor(private activateRoute: ActivatedRoute, protected service: MainService) {
        this.Id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    if (this.service.authService.me) {
      this.MyType = this.service.authService.me.user_type;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
         this.MyType = this.service.authService.me.user_type;
      }
    );
    this.service.accService.GetVacanciesById(this.Id)
      .subscribe(
        (res) => {
          this.Vacancie = res;
          console.log(res);
        }
      );
  }

  VacancyResponse() {
    this.service.accService.ResponseVacancies(this.Vacancie.id)
      .subscribe(
        (res) => {
          console.log(res);
          this.reqSended = true;
        }
      );
  }

}
