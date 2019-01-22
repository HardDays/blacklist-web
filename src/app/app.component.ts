import { MainService } from 'src/app/_services/main.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  IsHaveProcess = false;

  constructor(protected service: MainService) {
    this.service.authService.TryToLoginWithToken();

    this.service.ActiveProcessesChanges.subscribe(
      () => {
        if (this.service.ActiveProcesses.length > 0) {
            this.IsHaveProcess = true;
        } else {
          this.IsHaveProcess = false;
        }
      }
    );
  }
}
