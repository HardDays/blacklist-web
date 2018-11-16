import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-black',
  templateUrl: './create-black.component.html',
  styleUrls: ['./create-black.component.css']
})
export class CreateBlackComponent implements OnInit {

  Types = {
    'employeer': 1,
    'company': 2
  };

  CurrentType = this.Types.employeer;
  Image = '';

  Jobs = [];
  constructor() { }

  ngOnInit() {
  }

  AddJob() {

  }

  Save () {

  }

  setImage(image: string) {
    this.Image = image;
    this.addImage();
    // console.log(`image = `, image);
  }
  addImage() {
    // this.service.imageService.AddImage(this.Employee.id, this.Image)
    //   .subscribe(
    //     (res) => {
    //       this.service.authService.me.image_id = res.id;
    //     }
    //   );
  }

}
