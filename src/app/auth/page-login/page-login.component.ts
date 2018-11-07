import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  constructor(protected router: Router) { }

  ngOnInit() {
      // localStorage.setItem('currentUser', JSON.stringify({'token:': '12345'}));
  }

  setToken() {
    localStorage.setItem('token', '12345');
    this.router.navigate(['/blacklist']);
  }

}
