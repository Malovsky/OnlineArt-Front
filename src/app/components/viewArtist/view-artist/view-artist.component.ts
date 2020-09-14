import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'os';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.component.html',
  styleUrls: ['./view-artist.component.css']
})
export class ViewArtistComponent implements OnInit {
  public artistDetails: any;
  public hasPp: boolean = true;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetailArtist(this.route.snapshot.params.id);
  }

  getDetailArtist(id: any) {
    this.userService.getUserById(id).subscribe(
      data => {
        this.artistDetails = data;
        if (this.artistDetails.photoProfile == null) {
          this.hasPp = false;
        }
      },
      err => console.error(err)  
    );
  }

}
