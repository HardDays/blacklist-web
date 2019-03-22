import { Vacancie } from './../../_models/auth.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-my-vacance',
  templateUrl: './my-vacance.component.html',
  styleUrls: ['./my-vacance.component.css']
})
export class MyVacanceComponent implements OnInit {
    isNew = false;
    Id = 0;
    Vacancie: Vacancie = {
      id: 0,
      company_id: 0,
      company_name: '',
      position: '',
      salary: '',
      address: '',
      description: '',
      min_experience: 0
    };

    errorText = '';
    constructor(private activateRoute: ActivatedRoute, private router: Router, public service: MainService) {
        if (activateRoute.snapshot.params['id'] === 'new') {
          this.isNew = true;
        } else {
           this.Id = activateRoute.snapshot.params['id'];
           this.Vacancie.id = this.Id;
           this.GetVacance();
        }
   }

  ngOnInit() {
  }

  GetVacance() {
    this.service.accService.GetVacanciesById(this.Id)
      .subscribe(
        (res) => {
          this.Vacancie = res;
        }
      );
  }

  Save() {
    if (this.isNew) {
      this.service.accService.AddVacance(this.service.authService.me.id, this.Vacancie)
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/my-vacances']);
          },
          (err) => {
            const error = JSON.parse(err._body);
            let errText;
            errText = (error.position ? 'Незаполнена должность.' : '') + ' ' + (error.description ? 'Незаполнено описание.' : '');
            this.errorText = errText;
          }
        );
    } else {
      this.service.accService.PatchVacance(this.service.authService.me.id, this.Vacancie)
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/my-vacances']);
          }
        );
    }
  }

}
