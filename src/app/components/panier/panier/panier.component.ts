import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerCommandDTO } from 'src/app/models/orderItem/order-item.model';
import { ArtworkService } from 'src/app/services/artwork/artwork.service';
import { CommandesService } from 'src/app/services/commandes/commandes.service';
import { PanierService } from 'src/app/services/panier/panier.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(private panierService: PanierService,
    private artworkService: ArtworkService,
    private router: Router,
    private tokenService: TokenService,
    private commandesService: CommandesService) { }

  public artInBasket: any;
  public totalBasket = 0;
  public basketIsEmpty: boolean;

  public ccDto: CustomerCommandDTO;

  ngOnInit(): void {
    this.ccDto = new CustomerCommandDTO;
    this.basketIsEmpty = true;
    this.panierService.getArtworkPanier().subscribe(data => {
      this.artInBasket = data;
      if (this.artInBasket.length < 1) {
        this.basketIsEmpty = true;
      } else {
        this.basketIsEmpty = false;
      }
    });
    this.ccDto.listArtIds = this.artInBasket;
    this.ccDto.userId = this.tokenService.getUser().id;
    console.log(JSON.stringify(this.ccDto) + " CCDTO PANIER .TS");
    
    this.getArtInBasketDetails(this.artInBasket);
  }

  getArtInBasketDetails(artInBasket: any) {
    if (artInBasket.length != 0) {
      this.artworkService.getMultipleArtworkById(artInBasket).subscribe(data => {
        this.artInBasket = data;
        this.basketIsEmpty = false;
        this.totalBasket = 0;
        for (let art of this.artInBasket) {
          this.totalBasket += art.price;
        }
      }, err => console.error(err));
    } else {
      this.totalBasket = 0;
    }
  }

  deleteArtworkFromBasket(id: any) {
    this.panierService.sendRemoveArtwork(id);
    this.panierService.getArtworkPanier().subscribe(data => {
      this.artInBasket = data;
    });
    this.getArtInBasketDetails(this.artInBasket);
  }

  isBasketEmpty(artInBasket: any) {
    if (artInBasket.length == 0) {
      this.basketIsEmpty = true
    } else [
      this.basketIsEmpty = false
    ]
  }
  
  passOrder() {
    this.commandesService.passCommande(this.ccDto).subscribe(data => {
      console.log(data);
    },
    err => {
      console.error(err)
    });
    window.alert("Votre commande a été transmise avec succès. Vous allez reçevoir un mail récapitulatif à conserver.");
    this.panierService.clearPanier();
    this.router.navigate(['/']);
  }

}
