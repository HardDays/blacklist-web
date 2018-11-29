import { Employee } from './../../_models/auth.interface';
import { Component, OnInit } from '@angular/core';
import { LoginModel, Vacancie } from 'src/app/_models/auth.interface';
import { MainService } from 'src/app/_services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  user: LoginModel = {email: '', password: ''};
  constructor(protected service: MainService, protected router: Router) { }

  Vacancies: Vacancie[] = [];
  Employees: Employee[] = [];

  ngOnInit() {
      // localStorage.setItem('currentUser', JSON.stringify({'token:': '12345'}));
      this.service.accService.GetHomeVacanvies()
        .subscribe(
          res => {
            this.Vacancies = res;
          }
        );
      this.service.accService.GetHomeEmployees()
        .subscribe(
          res => {
            this.Employees = res;
          }
        );
  }

  Login() {
    this.service.authService.UserLogin(this.user)
      .subscribe(
        (res) => {
           console.log(res);
           this.service.authService.BaseInitAfterLogin(res);
           this.service.authService.TryToLoginWithToken();
           this.router.navigate(['']);
        }
      );
  }

}
