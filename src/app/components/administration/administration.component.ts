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

  /* TOUTES LES OEUVRES */
  public artworks: any;

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




}
