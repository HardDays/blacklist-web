import { Component, OnInit } from '@angular/core';
import { BlackListItem } from 'src/app/_models/auth.interface';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit {

  BlackList: BlackListItem[] = [];

  AllCount = 0;
  // tslint:disable-next-line:no-inferrable-types
  Page: number = 1;
  TextSearch = '';

  IsAdmin = false;

  constructor(protected service: MainService) { }

  ngOnInit() {

    if (this.service.authService.me) {
      this.IsAdmin = this.service.authService.me.is_admin;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
       this.IsAdmin = this.service.authService.me.is_admin;
       this.getBlacklist();
      }
    );

    this.getBlacklist();
  }

  search() {
    this.getBlacklist();
  }

  getBlacklist () {
    if (this.IsAdmin) {
      this.service.adminService.GetBanList()
        .subscribe(
        (res) => {
          this.BlackList = res.items;
          this.AllCount =  this.BlackList.length < 10 && this.Page === 1 ? this.BlackList.length : res.count;
          // console.log(this.BlackList);
        }
      );
    } else {
      this.service.blacklistService.GetBlacklistItem(this.Page, this.TextSearch)
      .subscribe(
        (res) => {
          this.BlackList = res.items;
          this.AllCount =  this.BlackList.length < 10 && this.Page === 1 ? this.BlackList.length : res.count;
          // console.log(this.BlackList);
        }
      );
    }
  }

}
