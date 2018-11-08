import { LoginModel } from './../../_models/auth.interface';
import { MainService } from './../../_services/main.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  user: LoginModel = {email: '', password: ''};
  constructor(protected service: MainService, protected router: Router) { }

  ngOnInit() {
      // localStorage.setItem('currentUser', JSON.stringify({'token:': '12345'}));
  }

  setToken() {
    localStorage.setItem('token', '12345');
    this.router.navigate(['/profile']);
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
