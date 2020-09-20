import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  public artworkPanier$: BehaviorSubject<any> = new BehaviorSubject(null);
  public addArtwork$: BehaviorSubject<any> = new BehaviorSubject(null);

  public artworkPanier = [];
  public addArtwork: any;

  constructor() { }

  public getArtworkPanier(): Observable<any> {
    return this.artworkPanier$.asObservable();
  }

  public sendArtworkPanier(artworkPanier: any) {
    this.artworkPanier$.next(artworkPanier);
  }

  public getAddArtwork(): Observable<any> {
    return this.addArtwork$.asObservable();
  }


  public sendAddArtwork(addArtworkId: any) {
    if (this.artworkPanier.length == 0) {
      this.artworkPanier.push(addArtworkId);
      window.alert("Oeuvre ajoutée au panier.");
    } else if (this.artworkPanier.includes(addArtworkId)) {
      window.alert("Vous ne pouvez commander qu'une seule unité à la fois.");
    } else {
      this.artworkPanier.push(addArtworkId);
      window.alert("Oeuvre ajoutée au panier.");
    }
    this.artworkPanier$.next(this.artworkPanier);
  }

  public sendRemoveArtwork(removeArtworkId: any) {
    let index = this.artworkPanier.indexOf(removeArtworkId);
    this.artworkPanier.splice(index, 1);
    this.artworkPanier$.next(this.artworkPanier);
  }
  

}