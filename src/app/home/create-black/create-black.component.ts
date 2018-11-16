import { Component, OnInit } from '@angular/core';
import { BlackListItem } from 'src/app/_models/auth.interface';
import { MainService } from 'src/app/_services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-black',
  templateUrl: './create-black.component.html',
  styleUrls: ['./create-black.component.css']
})
export class CreateBlackComponent implements OnInit {

  Types = {
    'employee': 1,
    'company': 2
  };

  CurrentType = this.Types.employee;

  Item: BlackListItem = {
    name: '',
    description: '',
    addresses: '',
    text: '',
    item_type: 'employee'
  };

  constructor(protected service: MainService, private router: Router) { }

  ngOnInit() {
  }

  AddJob() {

  }

  Save () {
    if (this.CurrentType === this.Types.employee) {
      this.Item.item_type = 'employee';
    } else {
      this.Item.item_type = 'company';
    }
    this.service.blacklistService.CreateBlacklistItem(this.Item)
      .subscribe(
        (res) => {
          console.log(`ok`);
          this.router.navigate(['/black-list']);
        }
      );
  }

}
