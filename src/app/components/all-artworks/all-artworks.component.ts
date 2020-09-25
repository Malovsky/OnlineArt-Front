import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';
import { ArtworkService } from 'src/app/services/artwork/artwork.service';

@Component({
  selector: 'app-all-artworks',
  templateUrl: './all-artworks.component.html',
  styleUrls: ['./all-artworks.component.css']
})
export class AllArtworksComponent implements OnInit {

  /* TOUTES LES OEUVRES */
  public artworks: any;
  public artworksSave: any;
  public artName: String;
  public artCategory: any;
  public artSubCategroy: any;
  public artColor: any;
  public artIsSigned: any;
  public artHasFrame: any;
  public artPrice: number;

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.getAllArtworks();
  }

  getAllArtworks() {
    this.artworkService.getAllArtworks().subscribe(
      data => {
        this.artworks = data;
        this.artworksSave = data;
      },
      err => console.log(err)
    );
  }

  filterArtwork() {
    this.artworks = this.artworksSave;
    // Filtre par nome
    this.searchArtwork(this.artName);
    // Filtre par catégorie
    this.filterCategory(this.artCategory);
    // Filtre par sous catégorie
    this.filterSousCategory(this.artSubCategroy);
    // Filtre par couleur
    this.filterColor(this.artColor);
    // Filtre par signé
    this.filterSigne(this.artIsSigned);
    // Filtre par cadre
    this.filterCadre(this.artHasFrame);
    // Filtre par prix
    this.filterPrice(this.artPrice);
  }

  searchArtwork(name: any) {
    if (name != null) {
      this.artworks = this.artworks.filter(artwork =>
        artwork.name.toUpperCase().includes(name.toUpperCase())
        || artwork.user.username.toUpperCase().includes(name.toUpperCase())
      );
    }
  }

  filterCategory(category: any) {
    if (category != null && category != "none") {
      this.artworks = this.artworks.filter(artwork =>
        artwork.category == category
      );
    }
  }

  filterSousCategory(sousCat: any) {
    if (sousCat != null && sousCat != "none") {
      this.artworks = this.artworks.filter(artwork =>
        artwork.subcategory == sousCat
      );
    }
  }

  filterColor(color: any) {
    if (color != null && color != "none") {
      this.artworks = this.artworks.filter(artwork =>
        artwork.majorColor == color
      );
    }
  }

  filterSigne(signe: any) {
    if (signe == "OUI") {
      console.log("signe oui");
      console.log(this.artworks);
      
      this.artworks = this.artworks.filter(artwork =>
        artwork.signed
      );
    } else if (signe == "NON") {
      console.log("signe non");
      this.artworks = this.artworks.filter(artwork =>
        !artwork.signed
      );
    }
  }

  filterCadre(cadre: any) {
    if (cadre == "OUI") {
      this.artworks = this.artworks.filter(artwork =>
        artwork.hasFrame
      );
    } else if (cadre == "NON") {
      this.artworks = this.artworks.filter(artwork =>
        !artwork.hasFrame
      );
    }
  }

  filterPrice(price: any) {
    if (price != null && price > 0 && price < 9999999999) {
      this.artworks = this.artworks.filter(artwork =>
        artwork.price <= price
      );
    }
  }

}