import { Employee, UserModel } from './../../_models/auth.interface';
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
  Position = '';
  Experience = 0;

  IsAdmin = false;
  IsPaid = false;

  Me: UserModel;

  constructor(protected service: MainService) { }

  ngOnInit() {

    if (this.service.authService.me) {
      this.IsAdmin = this.service.authService.me.is_admin;
      this.IsPaid = this.service.authService.me.is_payed;
      this.Me = this.service.authService.me;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
       this.IsAdmin = this.service.authService.me.is_admin;
       this.IsPaid = this.service.authService.me.is_payed;
       this.Me = this.service.authService.me;
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
      this.service.adminService.GetEmployeesList(this.Page, this.TextSearch, this.Experience, this.Position)
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
    } else if(this.IsPaid) {
      this.service.accService.GetEmployees(this.Page, this.TextSearch, this.Experience, this.Position)
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
