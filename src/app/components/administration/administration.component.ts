import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ArtworkService } from 'src/app/services/artwork/artwork.service';
import { CommandesService } from 'src/app/services/commandes/commandes.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  /* TOUS LES UTILISATEURS */
  public users: any;
  public saveUsersAdmin: any;
  public textSearchAdmin: String;

  /* TOUTES LES OEUVRES */
  public artworks: any;
  public artworksSave: any;
  public artNameAdmin: String;

  /* TOUTES LES COMMANDES */
  public commandes: any;


  constructor(private userService: UserService, private artworkService: ArtworkService, private commandeService: CommandesService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllArtworks();
    this.getAllCommandes();
  }

  /******* USERS *******/
  getAllUsers() {
    this.userService.getAllUsersDtype().subscribe(
      data => {
        this.users = data;
        this.saveUsersAdmin = data;
      },
      err => console.log(err)
    );
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(
      data => {
        console.log(data),
        this.getAllUsers();
        this.getAllArtworks();
      },
      err => console.error(err)
    );
  }

  /******* ARTWORKS *******/
  getAllArtworks() {
    this.artworkService.getAllArtworks().subscribe(
      data => {
        this.artworks = data;
        this.artworksSave = data;
      },
      err => console.log(err)
    );
  }

  deleteArtwork(id: any) {
    this.artworkService.deleteArtwork(id).subscribe(
      data => {
        console.log(data),
        this.getAllArtworks();
      },
      err => console.error(err)
    );
  } 
  
  /******* COMMANDES *******/
  getAllCommandes() {
    this.commandeService.getAllOrders().subscribe(
      data => {
        this.commandes = data;
      },
      err => console.log(err)
    );
  }

  deleteCommande(id: any) {
    this.commandeService.deleteCommande(id).subscribe(
      data => {
        console.log(data),
        this.commandes = data;
      },
      err => console.log(err)
    );
  }

  searchArtist(textSearch: String) {
    this.users = this.saveUsersAdmin;
    if (this.textSearchAdmin != "") {
      this.users = this.users.filter(user =>
          user.username.toUpperCase().includes(textSearch.toUpperCase()) 
          || (user.lastName != null && user.lastName.toUpperCase().includes(textSearch.toUpperCase()))
          || (user.firstName != null && user.firstName.toUpperCase().includes(textSearch.toUpperCase()))
          || (user.email != null && user.email.toUpperCase().includes(textSearch.toUpperCase()))
      );
    }
  }

  searchArtworkAdmin(artNameAdmin: String) {
    this.artworks = this.artworksSave;
    if (this.artNameAdmin != "") {
      this.artworks = this.artworks.filter(artwork =>
        artwork.name.toUpperCase().includes(artNameAdmin.toUpperCase())
      );
    }
  }


}
