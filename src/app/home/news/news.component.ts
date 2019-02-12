import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  IsAdmin = false;
  News = {count: 0, items: []};
  NewNews = '';

  AllCount = 0;
  Page = 1;

  constructor(protected service: MainService) { }

  ngOnInit() {

    if (this.service.authService.me) {
      this.IsAdmin = this.service.authService.me.is_admin;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
       this.IsAdmin = this.service.authService.me.is_admin;
       this.getNews();
      }
    );
    this.getNews();
  }

  getNews() {
      this.service.blacklistService.GetNews(this.Page)
        .subscribe(
          (res) => {
            this.News = res;
            this.AllCount =  this.News.items.length < 10 && this.Page === 1 ? this.News.items.length : res.count;
          }
        );
  }

  getTitle(text: string) {
    return text.length > 40 ? text.slice(0, 35) + ' ... ' : text;
  }


}
