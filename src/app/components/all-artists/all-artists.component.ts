import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.css']
})
export class AllArtistsComponent implements OnInit {

  /* TOUS LES UTILISATEURS */
  public saveUsers: any;
  public users: any;
  public textSearch: String;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsersDtype().subscribe(
      data => {
        this.users = data;
        this.saveUsers = data;
      },
      err => console.log(err)
    );
  }

  searchArtist(textSearch: String) {
    this.users = this.saveUsers;
    if (textSearch != "") {
      this.users = this.users.filter(user =>
          user.username.toUpperCase().includes(textSearch.toUpperCase()) 
          || (user.lastName != null && user.lastName.toUpperCase().includes(textSearch.toUpperCase()))
          || (user.firstName != null && user.firstName.toUpperCase().includes(textSearch.toUpperCase()))
          || (user.email != null && user.email.toUpperCase().includes(textSearch.toUpperCase()))
      );
    }
  }



}
