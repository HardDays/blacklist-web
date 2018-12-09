import { Company } from './../../../_models/auth.interface';
import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnChanges {

  @Input() id;
  @Input() imageId;

  @Input() isChangeType = false;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChangeType = new EventEmitter<boolean>();

  isEdit = false;

  Company: Company = {
    id: 0,
    name: ''
  };
  Image = '';
  errorText = '';
  succesText = '';
  constructor(protected service: MainService) { }

  ngOnInit() {
    if (this.service.authService.me) {
      this.Company.id = this.service.authService.me.id;
    }
  }

  changeType() {
    this.onChangeType.emit(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id) {
      this.id = changes.id.currentValue;
      this.Company.id = this.id;
      if (this.Company.id) {
        this.service.accService.GetCompanyById(this.Company.id)
          .subscribe(
            (res) => {
              this.Company = res;
              this.isEdit = true;
            },
            (err) => {
              console.log(`err`, err);
            }
          );
      }
    }
  }

  addUser() {
    if (!this.isEdit) {
      this.service.accService.CreateCompanies(this.Company)
        .subscribe(
          (res) => {
            this.errorText = '';
            this.succesText = 'Cохранено';
            this.service.authService.GetMe().subscribe(
              (acc) => {
                this.service.authService.me = acc;
                this.service.authService.onMeChange$.next(true);
              }
            );
          },
          (err) => {
            this.succesText = '';
            const error = JSON.parse(err._body);
            const errText = (error.name ? 'Незаполнено Нахвание компании.' : '');
            this.errorText = errText;
          }
        );
    } else {
      this.service.accService.PatchCompanies(this.Company)
        .subscribe(
          (res) => {
            console.log(`res`, res);
            this.succesText = 'Cохранено';
          },
          (err) => {
            this.succesText = '';
            const error = JSON.parse(err._body);
            const errText = (error.name ? 'Незаполнено Нахвание компании.' : '');
            this.errorText = errText;
          }
        );
    }
  }

  addImage() {
    this.service.imageService.AddImage(this.Company.id, this.Image)
      .subscribe(
        (res) => {
          this.service.authService.me.image_id = res.id;
        }
      );
  }



  setImage(image: string) {
    this.Image = image;
    this.addImage();
    // console.log(`image = `, image);
  }

}
