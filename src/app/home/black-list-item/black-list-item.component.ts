import { Comment } from './../../_models/auth.interface';
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
    text: '',
    item_type: ''
  };

  Comments: Comment[] = [];
  NewComment: Comment = {
    text: '',
    comment_type: 'like'
  };

  IsAdmin = false;

  constructor(private activateRoute: ActivatedRoute, protected service: MainService) {
        this.Id = activateRoute.snapshot.params['id'];
        console.log(this.Id);
   }

  ngOnInit() {
    if (this.service.authService.me) {
      this.IsAdmin = this.service.authService.me.is_admin;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
       this.IsAdmin = this.service.authService.me.is_admin;
      }
    );

    this.service.blacklistService.GetBlackListById(this.Id)
      .subscribe(
        res => {
          console.log(res);
          this.Item = res;
        }
      );
      this.getComments();
  }

  getComments () {
     this.service.blacklistService.GetBlacklistCommentById(this.Id)
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
    this.service.blacklistService.AddBlacklistCommentById(this.Id, this.NewComment)
      .subscribe(
      (res) => {
        this.getComments();
      }
      );
  }

    DeleteComment(id: number) {
    this.service.adminService.DeleteBanComment(id)
      .subscribe(
        res => {
          this.getComments();
        }
      );
  }

  approve() {
    this.service.adminService.ApproveBan(this.Item.id)
      .subscribe(
        (res) => {
          this.Item.status = 'approved';
        }
      );
  }

  delete() {
    this.service.adminService.DeleteBan(this.Item.id)
      .subscribe(
        (res) => {
          console.log(`ok`);
        }
      );
  }

}
