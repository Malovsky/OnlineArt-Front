import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public tokenService: TokenService, public sharedService: SharedService) { }

  private roles: string[];
  subscription: Subscription;
  subscription2: Subscription;
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username: string;

  ngOnInit(): void {
    this.sharedService.toDoOnInit();
    this.subscription = this.sharedService.getLogged().subscribe(data => {
      this.isLoggedIn = data;
    });

    this.subscription2 = this.sharedService.getAdminBoard().subscribe(data2 => {
      this.showAdminBoard = data2;
    })
  }

  logout() {
    this.tokenService.signOut();
    location.replace("http://localhost:4200/");
  }

}
