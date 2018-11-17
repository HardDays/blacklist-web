import { Employee, Comment } from './../../_models/auth.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MainService } from 'src/app/_services/main.service';

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

   constructor(private activateRoute: ActivatedRoute, protected service: MainService) {
        this.Id = activateRoute.snapshot.params['id'];
   }

  ngOnInit() {
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

}
