import { Employee, UserModel } from './../../_models/auth.interface';
import { Component, OnInit } from '@angular/core';
import { LoginModel, Vacancie } from 'src/app/_models/auth.interface';
import { MainService } from 'src/app/_services/main.service';
import { Router, NavigationEnd } from '@angular/router';
import { analyzeFileForInjectables } from '@angular/compiler';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  user: LoginModel = {email: '', password: ''};
  constructor(protected service: MainService, protected router: Router) {
   }

  Vacancies: Vacancie[] = [];
  Employees: Employee[] = [];

  isMe = false;
  isCompany = false;
  isPayed = false;
  isAdmin = false;
  Me: UserModel;


  Logout() {
    this.service.authService.Logout();
  }

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

    if (this.service.authService.me) {
      this.isCompany = this.service.authService.me.user_type === 'company' ? true : false;
      this.isPayed = this.service.authService.me.is_payed;
      this.isAdmin = this.service.authService.me.is_admin;
      this.isMe = this.service.authService.me.id ? true : false;
      if (this.isMe) {
            this.Me = this.service.authService.me;
          }
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
        if (this.service.authService.me) {
          this.isCompany = this.service.authService.me.user_type === 'company' ? true : false;
          this.isPayed = this.service.authService.me.is_payed;
          this.isAdmin = this.service.authService.me.is_admin;
          this.isMe = this.service.authService.me.id ? true : false;
          if (this.isMe) {
            this.Me = this.service.authService.me;
          }
        }
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
