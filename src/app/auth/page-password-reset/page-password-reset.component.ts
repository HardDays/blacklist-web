import { resetPass } from './../../_models/auth.interface';
import { MainService } from './../../_services/main.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-password-reset',
  templateUrl: './page-password-reset.component.html',
  styleUrls: ['./page-password-reset.component.css']
})
export class PagePasswordResetComponent implements OnInit {

  user: resetPass = {email: ''};
  ifSended = false;
  constructor(protected service: MainService, protected router: Router) { }
  error = false;
  ngOnInit() {
      // localStorage.setItem('currentUser', JSON.stringify({'token:': '12345'}));
  }

 

  sendNewPass() {
    this.service.authService.ResetPass(this.user)
      .subscribe(
        (res) => {
          this.ifSended = true;
          this.error = false;
        },
        (error)=>{
          this.error = true;
        }

      );
  }

}
