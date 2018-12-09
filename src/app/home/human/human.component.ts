import { Employee, Comment } from './../../_models/auth.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/_services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-human',
  templateUrl: './human.component.html',
  styleUrls: ['./human.component.css']
})
export class HumanComponent implements OnInit {
   Id = 0;
   EmptyImage = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png';
   Employee: Employee = {
    id: 0,
    first_name: '',
    last_name: '',
    second_name: '',
    gender: 'm',
    image: this.EmptyImage
  };

  Comments: Comment[] = [];
  NewComment: Comment = {
    text: '',
    comment_type: 'like'
  };

  IsAdmin = false;

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
       this.getEmployee();
      }
    );

    this.getEmployee();

  }

  getEmployee() {
    if (this.IsAdmin) {
      this.service.adminService.GetEmployeeById(this.Id)
        .subscribe(
          (res) => {
            this.Employee = res;
            this.Employee.birthday = this.Employee.birthday ? this.Employee.birthday.split('T')[0] : '';
            this.Employee.image = this.service.imageService.GetImage(this.Employee.id);
            console.log(this.Employee);
            this.getComments();
          }
        );
    } else {
      this.service.accService.GetEmployeeById(this.Id)
        .subscribe(
          (res) => {
            this.Employee = res;
            this.Employee.birthday = this.Employee.birthday ? this.Employee.birthday.split('T')[0] : '';
            this.Employee.image = this.service.imageService.GetImage(this.Employee.id);
            console.log(this.Employee);
            this.getComments();
          }
        );
    }
  }


  getComments () {
     this.service.accService.GetComments(this.Id)
       .subscribe(
         (res) => {
           this.Comments = res.items;
           for (const item of this.Comments) {
             if (item.user.image_id) {
               item.user.image = this.service.imageService.GetImage(item.user.image_id);
             }
           }
         }
       );
  }

  AddComment() {
    this.service.accService.AddComment(this.Id, this.NewComment)
      .subscribe(
      (res) => {
        this.getComments();
      }
      );
  }
  DeleteComment(id: number) {
    if (this.IsAdmin) {
      this.service.adminService.DeleteEmployeeCommentByAdmin(id)
        .subscribe(
          res => {
            this.getComments();
          }
        );
    } else {
      this.service.adminService.DeleteEmployeeComment(id)
        .subscribe(
          res => {
            this.getComments();
          }
        );
    }
  }

  approve() {
    this.service.adminService.ApproveEmployee(this.Employee.id)
      .subscribe(
        (res) => {
          this.Employee.status = 'approved';
          this.router.navigate(['/', 'human-list']);
        }
      );
  }

  delete() {
    this.service.adminService.DeleteEmployee(this.Employee.id)
      .subscribe(
        (res) => {
          // this.Employee.status = 'approved';
          this.router.navigate(['/', 'human-list']);
          console.log(`ok`);
        }
      );
  }

}
