import { MainService } from 'src/app/_services/main.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, protected service: MainService) { }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    if (localStorage.getItem('token')) {
      // залогинился - получи true
      return true;
    }

    // нет токена? - перенаправляем на страницу логина с возвращенным url
    this.router.navigateByUrl('/auth/home', { queryParams: { returnUrl: state.url } });
    return false;
  }
}
