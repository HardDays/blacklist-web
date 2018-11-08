import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( protected service: MainService) { }

  ngOnInit() {
  }

  Logout() {
    this.service.authService.Logout();
  }

}
