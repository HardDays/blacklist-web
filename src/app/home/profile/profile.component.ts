import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';
import { UserModel } from 'src/app/_models/auth.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Id = 0;
  ImageId = 0;
  Type = '';
  isChangeType = false;
  constructor(protected service: MainService) { }

  ngOnInit() {
    this.InitUser();

    this.service.authService.onMeChange$.subscribe(
      (res) => {
        if (res) {
          this.InitUser();
        }
      }, (err) => {
        console.log(`err = `, err);

        // if (err.json().) {
        //   this.service.authService.Logout();
        // }
      }
    );
  }

  InitUser() {
    console.log(`profile`, this.service.authService.me);
            this.isChangeType = false;
            if (this.service.authService.me) {
              this.Id = this.service.authService.me.id;
              this.ImageId = this.service.authService.me.image_id;
            }
            if (this.service.authService.me && this.service.authService.me.user_type) {
              this.Type = this.service.authService.me.user_type;
            } else {
              this.Type = localStorage.getItem('registerType') ? localStorage.getItem('registerType') : 'employee';
              this.isChangeType = true;
            }
  }

  changeType() {
    if (this.Type === 'employee') {
      this.Type = 'company';
    } else {
      this.Type = 'employee';
    }
  }

}
