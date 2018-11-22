import { Component } from '@angular/core';

@Component({
  template: `
  <div class="limiter">
  <div class="container-login100" style="background-image: url('../../assets/images/bg-01.jpg');">
    <div class="wrap-login100">
      <div class="login100-form validate-form">
        <div></div>
        <span class="login100-form-logo">
          <!-- <i class="zmdi zmdi-landscape"></i> -->
          BL
        </span>
  <router-outlet></router-outlet>
  </div>
    </div>
  </div>
</div>

  
  `
})
export class AuthComponent {}
