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

  error = false;
  errorText = '';
  Token = '';
  UserId = 0;

  Type = 'employee';

  constructor(protected service: MainService, protected router: Router) { }

  ngOnInit() {
  }

  CreateUserByEmail() {
    this.service.WaitBeforeLoading(
    () => this.service.authService.CreateUserEmail(this.Email),
        (res) => {
          console.log(`add email ok`, res);
          this.error = false;
          this.errorText = '';
          this.CurrentStep = this.Steps.code;
        },
        (err) => {
          this.error = true;
          if (err.status === 500) {
            this.errorText = 'Введите корректный email';
          }
          if (err.status === 422) {
            this.errorText = 'Пользователь с данным email уже существует';
          }
        }

      );
  }

  VerifyCode() {
    this.service.WaitBeforeLoading(
      () => this.service.authService.CreateUserVerifyEmail(this.Email, this.Code),
      (res) => {
          console.log(`add email ok`, res);
          this.errorText = '';
          this.error = false;
          // this.service.authService.BaseInitAfterLogin(res);
          this.Token = res.token;
          this.UserId = res.id;
          this.CurrentStep = this.Steps.password;
        },
        (err) => {
          this.error = true;
          this.errorText = 'Код неверный';
        }
      );
  }

  AddPassword() {
    if (this.Password.password.length > 4 && this.Password.password === this.Password.password_confirmation) {
      this.service.authService.BaseInitAfterLogin({token: this.Token});
      this.service.authService.PatchUserToAddPassword(this.UserId, this.Password.password, this.Password.password_confirmation)
        .subscribe(
          (res) => {
            this.error = false;
            this.errorText = '';
            localStorage.setItem('registerType', this.Type);
            this.Login();
          }
        );
    }
    if (this.Password.password.length < 4) {
        this.error = true;
        this.errorText = 'Пароль должен включать минимум 4 символа';
    }
    if (this.Password.password !== this.Password.password_confirmation) {
        this.error = true;
        this.errorText = 'Пароли не совпадают';
    }
  }

  Login() {
    this.service.WaitBeforeLoading(
    () =>
    this.service.authService.UserLogin({email: this.Email, password: this.Password.password}),
    (res) => {
           this.service.authService.BaseInitAfterLogin(res);
           this.service.authService.TryToLoginWithToken();
           this.router.navigate(['']);
        }
      );
  }

}
