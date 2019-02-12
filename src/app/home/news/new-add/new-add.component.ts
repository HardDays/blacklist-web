import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-new-add',
  templateUrl: './new-add.component.html',
  styleUrls: ['./new-add.component.css']
})
export class NewAddComponent implements OnInit {

  NewNews = '';
  IsAdmin = false;
  IsSuccess = false;

  constructor(protected service: MainService) { }

  ngOnInit() {

    if (this.service.authService.me) {
      this.IsAdmin = this.service.authService.me.is_admin;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
       this.IsAdmin = this.service.authService.me.is_admin;
      }
    );
  }

  addNews() {
    this.service.blacklistService.AddNews(this.NewNews)
        .subscribe(
          (res) => {
            console.log(`success`);
            this.IsSuccess = true;
          }
        );
  }

}
