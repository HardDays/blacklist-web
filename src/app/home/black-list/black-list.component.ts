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
  constructor(protected service: MainService) { }

  ngOnInit() {
    this.service.blacklistService.GetBlacklistItem(this.Page)
      .subscribe(
        (res) => {
          this.BlackList = res.items;
          this.AllCount = res.counts;
          // console.log(this.BlackList);
        }
      );
  }

  search() {
    console.log(`search`);

    this.service.blacklistService.GetBlacklistItem(this.Page, this.TextSearch)
      .subscribe(
        (res) => {
           console.log(`ok`);
          this.BlackList = res.items;
          this.AllCount =  this.BlackList.length < 10 && this.Page === 1 ? this.BlackList.length : res.count;
          // console.log(this.BlackList);
        }
      );
  }

}
