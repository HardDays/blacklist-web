import { Component, OnInit } from '@angular/core';
import { BlackListItem } from 'src/app/_models/auth.interface';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-black-list-item',
  templateUrl: './black-list-item.component.html',
  styleUrls: ['./black-list-item.component.css']
})
export class BlackListItemComponent implements OnInit {

  Id = 0;
  Item: BlackListItem = {
    name: '',
    description: '',
    addresses: '',
    text: ''
  };

  constructor(private activateRoute: ActivatedRoute, protected service: MainService) {
        this.Id = activateRoute.snapshot.params['id'];
        console.log(this.Id);
   }

  ngOnInit() {
    this.service.blacklistService.GetBlackListById(this.Id)
      .subscribe(
        res => {
          console.log(res);
          this.Item = res;
        }
      );
  }

}
