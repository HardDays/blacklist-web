import { Employee } from './../../_models/auth.interface';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-human-list',
  templateUrl: './human-list.component.html',
  styleUrls: ['./human-list.component.css']
})
export class HumanListComponent implements OnInit {

  Employees: Employee[] = [];
  EmptyImage = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png';

  constructor(protected service: MainService) { }

  ngOnInit() {
    this.service.accService.GetEmployees()
      .subscribe(
        (res) => {
          this.Employees = res;
          for (const item of this.Employees) {
             item.image = this.service.imageService.GetImage(item.id);
          }
          console.log(`Employees`, this.Employees);
        }
      );
  }

  search(text: string) {
    this.service.accService.GetEmployees(text)
      .subscribe(
        (res) => {
          this.Employees = [];
          this.Employees = res;
          for (const item of this.Employees) {
             item.image = this.service.imageService.GetImage(item.id);
          }
          console.log(`Employees`, this.Employees);
        }
      );
  }

}
