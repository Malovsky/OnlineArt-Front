import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtworkPanierDto } from 'src/app/models/artwork/artwork.model';
import { ArtworkService } from 'src/app/services/artwork/artwork.service';
import { PanierService } from 'src/app/services/panier/panier.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-view-artwork',
  templateUrl: './view-artwork.component.html',
  styleUrls: ['./view-artwork.component.css']
})
export class ViewArtworkComponent implements OnInit {
  public artworkDetail;
  public ownerOfArt;
  public artIndispo: Boolean = false;
  subscription: Subscription;
  isLoggedIn = false;

  public apDto: ArtworkPanierDto;

  constructor(private route: ActivatedRoute, private artworkService: ArtworkService, private userService: UserService, private panierService: PanierService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.apDto = new ArtworkPanierDto;
    this.getDetailsArtwork(this.route.snapshot.params.id);
    this.getOwnerById(this.route.snapshot.params.id);
    this.subscription = this.sharedService.getLogged().subscribe(data => {
      this.isLoggedIn = data;
    });
  }

  getDetailsArtwork(id: any) {
    this.artworkService.getArtworkById(id).subscribe(data => {
      this.artworkDetail = data;
      if (this.artworkDetail.availability == 0) {
          this.artIndispo == true;
      }
    }, err => console.error(err));
  }

  getOwnerById(id: any) {
    this.userService.getOwnerById(id).subscribe(data => {
      this.ownerOfArt = data;
    }, err => console.error(err));
  }

  addToBasket(id: any) {
    console.log(id);
    this.panierService.sendAddArtwork(id);
  }

  
}
