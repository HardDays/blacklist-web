import { MainService } from 'src/app/_services/main.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(protected service: MainService) {
    this.service.authService.TryToLoginWithToken();
  }
}
