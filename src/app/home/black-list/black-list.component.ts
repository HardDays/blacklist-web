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
  AllCounts = 0;
  constructor(protected service: MainService) { }

  ngOnInit() {
    this.service.blacklistService.GetBlacklistItem()
      .subscribe(
        (res) => {
          this.BlackList = res.items;
          this.AllCounts = res.counts;
          // console.log(this.BlackList);
        }
      );
  }

  search(event) {

  }

}
