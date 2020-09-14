import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginRequest } from 'src/app/models/user/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public isLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject(false)
  isLoggedIn = false;
  isLoginFailed = false;
  showAdminBoard = false;
  showUserBoard = false;
  errorMessage = '';
  roles: string[] = [];

  lr: LoginRequest;
  @ViewChild('lrForm', { static: false }) ngForm: NgForm;

  constructor(
    public router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.lr = new LoginRequest();

    this.sharedService.toDoOnInit();

    if(this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roles;
    }
  }


  /* C:\Users\kevin\AppData\Local\Programs\Microsoft VS Code\resources\app\extensions\node_modules\typescript\lib\lib.es5.d.ts
  propriété "token" de data.token ajoutée ligne 121 */
  login() {
    if (this.ngForm.valid) {
      this.authService.loginUser(this.lr).subscribe(data => {
        this.tokenService.saveToken(data.token)
        this.tokenService.saveUser(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.tokenService.getUser().roles;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showUserBoard = this.roles.includes('ROLE_USER');
        this.sharedService.sendAdminBoard(this.showAdminBoard);
        this.sharedService.sendLogged(this.isLoggedIn);
        this.goToHomePage();
      }, err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      });
    }
  }

  goToHomePage() {
    this.router.navigateByUrl('');
  }

}
