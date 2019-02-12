import { MainService } from './../../../_services/main.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  IsAdmin = false;
  Id = 0;
  Item = null;
  constructor(private activateRoute: ActivatedRoute, protected service: MainService, private router: Router) {
    this.Id = activateRoute.snapshot.params['id'];
  }

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
    if (this.Id) {
      this.service.blacklistService.GetNewsById(this.Id)
        .subscribe(
          (res) => {
            console.log(res);
            this.Item = res;
          }
      );
    }
  }

  Delete() {
    if (this.Id) {
      this.service.blacklistService.DeleteNews(this.Id)
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/news']);
          }
      );
    }
  }

}
