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
export class AuthPageGuard implements CanActivate {

   constructor(private router: Router) {  }

   canActivate(next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): boolean {

      // есть токен? не пускаем юзера
      if (localStorage.getItem('token')) {
         window.stop();
         this.router.navigateByUrl('');
         return false;
      }

      // нет токена? - отправляем на страницу логина
      return true;
   }
}
