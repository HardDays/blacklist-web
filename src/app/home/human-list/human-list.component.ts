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
       this.GetEmployees();
      }
    );
    this.GetEmployees();
  }

  search() {
    this.GetEmployees();
  }

  GetEmployees() {
    if (this.IsAdmin) {
      this.service.adminService.GetEmployeesList()
        .subscribe(
          (res) => {
            this.Employees = [];
            this.Employees = res.items;
            this.AllCount =  this.Employees.length < 10 && this.Page === 1 ? this.Employees.length : res.count;
            for (const item of this.Employees) {
               item.image = this.service.imageService.GetImage(item.id);
            }
            console.log(`Employees`, this.Employees);
          }
        );
    } else {
      this.service.accService.GetEmployees(this.Page, this.TextSearch)
      .subscribe(
        (res) => {
          this.Employees = [];
          this.Employees = res.items;
          this.AllCount =  this.Employees.length < 10 && this.Page === 1 ? this.Employees.length : res.count;
          for (const item of this.Employees) {
             item.image = this.service.imageService.GetImage(item.id);
          }
          console.log(`Employees`, this.Employees);
        }
      );
    }
  }

}
