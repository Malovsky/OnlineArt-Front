import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork/artwork.service';

@Component({
  selector: 'app-all-artworks',
  templateUrl: './all-artworks.component.html',
  styleUrls: ['./all-artworks.component.css']
})
export class AllArtworksComponent implements OnInit {

  /* TOUTES LES OEUVRES */
  public artworks: any;

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.getAllArtworks();
  }

  getAllArtworks() {
    this.artworkService.getAllArtworks().subscribe(
      data => {
        this.artworks = data;
      },
      err => console.log(err)
    );
  }

}
