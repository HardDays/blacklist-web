import { Vacancie } from './../../_models/auth.interface';
import { MainService } from './../../_services/main.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
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
    address: '',
    description: '',
    min_experience: 0
  };
  reqSended = false;
  MyType = '';
  IsAdmin = false;
  constructor(private activateRoute: ActivatedRoute, protected service: MainService, private router: Router) {
        this.Id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    if (this.service.authService.me) {
      this.MyType = this.service.authService.me.user_type;
      this.IsAdmin = this.service.authService.me.is_admin;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
         this.MyType = this.service.authService.me.user_type;
         this.IsAdmin = this.service.authService.me.is_admin;
         this.GetVacanciesById();
      }
    );
    this.GetVacanciesById();
  }

  GetVacanciesById() {
    if (this.IsAdmin) {
      this.service.adminService.GetVacancieById(this.Id)
      .subscribe(
        (res) => {
          this.Vacancie = res;
          console.log(res);
        }
      );
    } else {
      this.service.accService.GetVacanciesById(this.Id)
      .subscribe(
        (res) => {
          this.Vacancie = res;
          console.log(res);
        }
      );
    }
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

  approve() {
    this.service.adminService.ApproveVacancie(this.Vacancie.id)
      .subscribe(
        (res) => {
          this.Vacancie.status = 'approved';
          this.router.navigate(['/', 'vacances']);
        }
      );
  }

  delete() {
    this.service.adminService.DeleteVacancie(this.Vacancie.id)
      .subscribe(
        (res) => {
          // this.Employee.status = 'approved';
          this.router.navigate(['/', 'vacances']);
          console.log(`ok`);
        }
      );
  }

}
