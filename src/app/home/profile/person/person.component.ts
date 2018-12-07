import { Employee, Job } from './../../../_models/auth.interface';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnChanges {

  @Input() id;
  @Input() imageId;

  isEdit = false;

  Employee: Employee = {
    id: 0,
    first_name: '',
    last_name: '',
    second_name: '',
    gender: 'm'
  };
  Image = '';
  errorText = '';
  Jobs: Job[] = [];
  succesText = "";
  constructor(protected service: MainService) { }

  ngOnInit() {
    if (this.service.authService.me) {
      this.Employee.id = this.service.authService.me.id;
    }
    this.AddJob();
  }

  AddJob() {
    this.Jobs.push({
      name: '',
      period: ''
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id) {
      this.id = changes.id.currentValue;
      this.Employee.id = this.id;
      if (this.Employee.id) {
        this.service.accService.GetEmployeeById(this.Employee.id)
          .subscribe(
            (res) => {
              if (res) {
                this.Employee = res;
                this.Employee.birthday = this.Employee.birthday ? this.Employee.birthday.split('T')[0] : '' ;
                this.Jobs = this.Employee.jobs;
                if (this.Jobs.length === 0) {
                   this.AddJob();
                }
                this.isEdit = true;
              }
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
      this.service.accService.CreateEmployee(this.Employee)
        .subscribe(
          (res) => {
            this.service.authService.GetMe().subscribe(
              (acc) => {
                this.service.authService.me = acc;
                this.service.authService.onMeChange$.next(true);
              }
            );
            this.errorText = "";
            this.SendJobs();
          },
          (err)=>{
            let error = JSON.parse(err._body);
            let errText = (error.first_name ? 'Незаполнено имя.':'') + ' ' + (error.second_name ? 'Незаполнено отчество.':'') + ' ' +(error.last_name ? 'Незаполнена фамилия.':'');
            this.errorText = errText;
            this.succesText = ""
            
          }
        );
    } else {
      this.service.accService.PatchEmployee(this.Employee)
        .subscribe(
          (res) => {
            this.errorText = "";
            
            this.SendJobs();
          },
          (err)=>{
            let error = JSON.parse(err._body);
            let errText = (error.first_name ? 'Незаполнено имя.':'') + ' ' + (error.second_name ? 'Незаполнено отчество.':'') + ' ' +(error.last_name ? 'Незаполнена фамилия.':'');
            this.errorText = errText;
            this.succesText = "";
          }
        );
    }
  }

  SendJobs() {
    for (const item of this.Jobs) {
      if (!item.id) {
        this.service.accService.AddJob(this.Employee.id, item)
          .subscribe(
            (res) => {
              this.errorText = "";
              this.succesText = "Cохранено"
              console.log(`ok`);
            },
            (err)=>{
              console.log(err);
              let error = JSON.parse(err._body);
              let errText = (error.name ? 'Незаполнено название прошлого места работы.':'') + ' ' + (error.period ? 'Незаполнен период прошлого места работы.':'')
              this.errorText = errText;
              this.succesText = ""
            }
          );
      } else {
        this.service.accService.PatchJob(this.Employee.id, item)
          .subscribe(
            (res) => {
              this.errorText = "";
              console.log(`ok`);
              this.succesText = "Cохранено"
            },
            (err)=>{
              let error = JSON.parse(err._body);
              let errText = (error.name ? 'Незаполнено название прошлого места работы.':'') + ' ' + (error.period ? 'Незаполнен период прошлого места работы.':'')
              this.errorText = errText;
              this.succesText = ""
            }
          );
      }
    }
  }

  addImage() {
    this.service.imageService.AddImage(this.Employee.id, this.Image)
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
