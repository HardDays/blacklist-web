import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  Steps = {
    'email': 1,
    'code': 2,
    'password': 3
  };
  CurrentStep = this.Steps.email;

  Email = '';
  Code = '';
  Password = {
    password: '',
    password_confirmation: ''
  };

  Token = '';
  UserId = 0;

  constructor(protected service: MainService, protected router: Router) { }

  ngOnInit() {
  }

  CreateUserByEmail() {
    this.service.authService.CreateUserEmail(this.Email)
      .subscribe(
        (res) => {
          console.log(`add email ok`, res);
          this.CurrentStep = this.Steps.code;
        }
      );
  }

  VerifyCode() {
    this.service.authService.CreateUserVerifyEmail(this.Email, this.Code)
      .subscribe(
        (res) => {
          console.log(`add email ok`, res);
          // this.service.authService.BaseInitAfterLogin(res);
          this.Token = res.token;
          this.UserId = res.id;
          this.CurrentStep = this.Steps.password;
        }
      );
  }

  AddPassword() {
    if (this.Password.password.length > 4 && this.Password.password === this.Password.password_confirmation) {
      this.service.authService.BaseInitAfterLogin({token: this.Token, id: this.UserId});
      this.service.authService.PatchUserToAddPassword(this.UserId, this.Password.password, this.Password.password_confirmation)
        .subscribe(
          (res) => {
            console.log(`add password ok`, res);
            this.Login();
          }
        );
    }
  }

  Login() {
    this.service.authService.UserLogin({email: this.Email, password: this.Password.password})
      .subscribe(
        (res) => {
           this.service.authService.BaseInitAfterLogin(res);
           this.service.authService.TryToLoginWithToken();
           this.router.navigate(['']);
        }
      );
  }

}
