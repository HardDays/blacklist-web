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
export class PayGuard implements CanActivate {

  constructor(private router: Router, protected service: MainService) { }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    if (this.service.authService.me.id && !this.service.authService.me.is_payed) {
      this.router.navigateByUrl('/pay');
      return false;
    }

    this.service.authService.onMeChange$.subscribe(
      res => {
        if (this.service.authService.me.id && !this.service.authService.me.is_payed) {
         this.router.navigateByUrl('/pay');
         return false;
        }
      }
    );

     return true;
  }
}
