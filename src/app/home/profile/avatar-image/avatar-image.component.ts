import { Component, OnInit, OnChanges, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.css']
})
export class AvatarImageComponent implements OnInit, OnChanges {

  constructor(protected service: MainService) { }

  @Input() ImageId = 0;
  @Input() showProfile = true;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onImageChanged = new EventEmitter<string>();

  Image = '';
  EmptyImage = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png';

  ngOnInit() {
    this.Image = this.EmptyImage;
    if (this.ImageId) {
      this.Image = this.service.imageService.GetImage(this.ImageId);
        // .subscribe(
        //   (image) => {
        //     this.Image = image;
        //   }
        // );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ImageId) {
      this.ImageId = changes.ImageId.currentValue;
      if (this.ImageId) {
        this.Image = this.service.imageService.GetImage(this.ImageId);
          // .subscribe(
          //   (image) => {
          //     this.Image = image;
          //   }
          // );
      }
    }
  }

  uploadImage($event) {
    this.ReadImages(
        $event.target.files,
        (res: string) => {
            this.Image = res;
            this.onImageChanged.emit(this.Image);
        }
    );
  }

    protected ReadImages(files: any, callback?: (params?) => any) {
        for (const f of files) {
            const file: File = f;
            if (!file) {
               break;
            }

            const myReader: FileReader = new FileReader();
            myReader.onloadend = (e) => {
                callback(myReader.result);
            };
            myReader.readAsDataURL(file);
        }
    }

}
