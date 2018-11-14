import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( protected service: MainService) { }

  isCompany = false;

  ngOnInit() {
    if (this.service.authService.me) {
      this.isCompany = this.service.authService.me.user_type === 'company' ? true : false;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
        if (this.service.authService.me) {
          this.isCompany = this.service.authService.me.user_type === 'company' ? true : false;
        }
      }
    );
  }

  Logout() {
    this.service.authService.Logout();
  }

}
