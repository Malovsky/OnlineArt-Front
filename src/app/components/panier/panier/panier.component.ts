import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtworkService } from 'src/app/services/artwork/artwork.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(private panierService: PanierService, private artworkService: ArtworkService, private router: Router) { }

  public artInBasket: any;
  public totalBasket = 0;
  public basketIsEmpty: boolean;

  ngOnInit(): void {
    this.basketIsEmpty = true;
    this.panierService.getArtworkPanier().subscribe(data => {
      this.artInBasket = data;
    });
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
    
  }

}


