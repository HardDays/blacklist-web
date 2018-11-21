import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { HttpService } from './http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs';
import {Subject} from 'rxjs/Subject';
// import { AccountCreateModel } from '../models/accountCreate.model';
// import { UserCreateModel } from '../models/userCreate.model';
// import { UserGetModel } from '../models/userGet.model';
// import { LoginModel } from '../models/login.model';
// import { TypeService } from './type.service';
// import { FrontWorkingTimeModel } from '../models/frontWorkingTime.model';
// import { WorkingTimeModel } from '../models/workingTime.model';
// import { ContactModel } from '../models/contact.model';
// import { EventDateModel } from '../models/eventDate.model';
import { TokenModel, UserModel, LoginModel, Employee, Company, resetPass } from '../_models/auth.interface';

@Injectable()
export class AuthMainService {

    public onAuthChange$: Subject<boolean>;
    public me: UserModel = {
      id: 0,
      email: '',
      user_type: '',
      image_id: 0,
      is_payed: false,
      is_admin: false
    };
    public onMeChange$: Subject<boolean>;
    public onLoadingChange$: Subject<boolean>;

    constructor(private http: HttpService, private router: Router) {
        this.onAuthChange$ = new Subject();
        this.onAuthChange$.next(false);

        this.onMeChange$ = new Subject();
        this.onMeChange$.next(false);

        this.onLoadingChange$ = new Subject();
        this.onLoadingChange$.next(false);
    }

    IsLogedIn(): boolean {
        const token = this.GetToken();
        if (!token || !token.token) {
            return false;
        }
        return true;
    }


    GetToken() {
        return this.http.GetToken();
    }


    UserLogin(user: LoginModel) {
        return this.http.CommonRequest(
            () => this.http.PostData('/auth/login.json', user)
        );
    }
    ResetPass(user: resetPass) {
        return this.http.CommonRequest(
            () => this.http.PostData('/auth/forgot_password.json', user)
        );
    }

    Logout() {
        return this.http.CommonRequest(
            () => this.http.PostData('/auth/logout.json', '{}')
        ).subscribe(() => {
            this.ClearSession();
            this.router.navigate(['/auth']);
        });
    }


    BaseInitAfterLogin(data: TokenModel) {

      localStorage.setItem('token', data.token);
      this.http.BaseInitByToken(data.token);

      this.GetMe().subscribe(
        (res) => {

          this.me = res;
           console.log(`ME = `, this.me);
          this.onMeChange$.next(true);
        }
      );
    }


    TryToLoginWithToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.BaseInitAfterLogin(new TokenModel(token));
            this.onAuthChange$.next(true);
        }
    }


    ClearSession() {
        this.http.token = null;
        this.http.headers.delete('Authorization');
        this.onAuthChange$.next(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.me = null;
    }


    GetMe() {
        return this.http.CommonRequest(
            () => this.http.GetData('/users/my.json', '')
        );
    }

    CreateUserEmail(email: string) {
        return this.http.CommonRequest(
            () => this.http.PostData('/users.json', JSON.stringify({email}))
        );
    }

    CreateUserVerifyEmail(email: string, code: string) {
        return this.http.CommonRequest(
            () => this.http.PostData('/users/verify_code.json', JSON.stringify({email, code}))
        );
    }

    PatchUserToAddPassword(id: number, password: string, password_confirmation: string) {
      return this.http.CommonRequest(
            () => this.http.PatchData('/users/' + id + '.json', JSON.stringify({password, password_confirmation}))
        );
    }

    UpdateUser(user: UserModel) {
        // console.log(user);
        return this.http.CommonRequest(
            () => this.http.PatchData('/users/me.json', user)
        );
    }

}
