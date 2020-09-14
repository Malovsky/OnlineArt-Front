import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UpdateUserDto, UpdateUserPasswordDto, CreateUserDto } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { TokenService } from 'src/app/services/token/token.service';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CreateArtWorkDto } from 'src/app/models/artwork/artwork.model';
import { ArtworkService } from 'src/app/services/artwork/artwork.service';
import { ThrowStmt } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  errorMessage = '';
  isSameMDP = true;
  checkPassword = '';
  newPassword = '';
  subscription: Subscription;

  public user: any;

  /* MES INFORMATIONS CONSULTATION / MODIFICATION */
  public uuDto: UpdateUserDto;
  @ViewChild('uuDtoForm', { static: false }) ngForm: NgForm;
  isUserChanged = false;
  isUserChangedFailed = false;

  /* CONSULTER MES OEUVRES */
  public listArtwork;
  public isListEmpty = true;
  public idUser: String;

  /* AJOUTER UNE OEUVRE */
  public cawDto: CreateArtWorkDto;
  @ViewChild('cawDtoForm', { static: false }) cawDtoForm: NgForm;
  public currentArt;
  private selectedArt;
  private artToUpload;
  isArtUpload = false;
  isArtUploadFailed = false;
  

  /* CHANGER PHOTO DE PROFILE */
  private selectedFile;
  private currentPPUpload;

  /* CHANGER DE MOT DE PASSE */
  public updateUserPass: UpdateUserPasswordDto;
  @ViewChild('updateUserPassForm', { static: false }) ngFormPass: NgForm;
  isPassChanged = false;
  isPassChangedFailed = false;

  constructor(private userService: UserService, private artworkService: ArtworkService , private tokenService: TokenService, public sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    /* upadate user */
    this.uuDto = new UpdateUserDto();
    /* upadate password */
    this.updateUserPass = new UpdateUserPasswordDto();
    /* add artwork */
    this.cawDto = new CreateArtWorkDto();
    this.getUsersInfos();
    this.getMyArtworks();
  } 

  /* MES INFORMATIONS CONSULTATION */
  getUsersInfos() {
    this.userService.getUserById(this.tokenService.getUser().id).subscribe(
      dataInfos => {
        console.log("dataInfos : ", dataInfos);
        // Update profile
        this.uuDto.id = dataInfos.id;
        this.uuDto.username = dataInfos.username;
        this.uuDto.email = dataInfos.email;
        this.uuDto.firstName = dataInfos.firstName;
        this.uuDto.lastName = dataInfos.lastName;
        this.uuDto.address = dataInfos.address;
        this.uuDto.biography = dataInfos.biography;
        // Update password
        this.updateUserPass.id = dataInfos.id;
        // Get my Artworks
        this.idUser = dataInfos.id;
      },
      err => console.error("user : ", this.user, "user id : ", this.tokenService.getUser().id, err)
    );
  }

  /******* MES INFORMATIONS MODIFICATION *******/
  updateUser() {
    if (this.ngForm.valid) {
      this.userService.updateUser(this.uuDto).subscribe(dataUpdate => {
        console.log("uuDto update : ", dataUpdate);
        this.isUserChanged = true;
        this.isUserChangedFailed = false;
      }, err => {
        console.log("Err : uuDto update, uuDto : ", this.uuDto);
        this.errorMessage = err.error.message;
        this.isUserChangedFailed = true;
      });
    }
  }

  /******* CHANGER DE MOT DE PASSE *******/
  updateUserPassword() {
    if (this.ngFormPass.valid) {
      this.userService.updateUserPassword(this.updateUserPass).subscribe(dataUpdatePass => {
        console.log("user update password : ", dataUpdatePass);
        this.isPassChanged = true;
        this.isPassChangedFailed = false;
      }, err => {
        console.log("user update password : ", this.updateUserPass);
        this.errorMessage = err.error.message;
        this.isPassChangedFailed = true;
      });
    }
  }

  isSamePassword() {
    if (this.updateUserPass.newPassword !== this.updateUserPass.checkPassword) {
      console.log('newpass', this.updateUserPass.newPassword, 'checkpass', this.updateUserPass.checkPassword);
      this.isSameMDP = false;
    } else {
      console.log('newpass', this.updateUserPass.newPassword, 'checkpass', this.updateUserPass.checkPassword);
      this.isSameMDP = true;
    }
  }

  /******* CHANGER PHOTO DE PROFILE *******/
  newPhotoProfile(event) {
    this.selectedFile = event.target.files;
  }

  uploadPhoto() {
    this.currentPPUpload = this.selectedFile.item(0);
    this.userService.updatePhotoProfile(this.currentPPUpload, this.uuDto.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log("Uploading photo ...");
      } else if (event instanceof HttpResponse) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/myAccount']);
      });
      }
    }, err => {
      alert("Un problème est survenu lors du téléchargement." + err);
    });
  }

  /******* MES OEUVRES *******/
  getMyArtworks() {
    this.artworkService.getMyArtworks(this.tokenService.getUser().id).subscribe(
      data => {
        this.listArtwork = data
        if (this.listArtwork.length > 0) {
          this.isListEmpty = false;
        } else {
          this.isListEmpty = true;
        }
      },
      err => console.error(err, console.log("this.idUser = " + this.idUser))
    );
  }

  userDeleteArtwork(id: any) {
    this.artworkService.deleteArtwork(id).subscribe(
      data => {
        console.log("Call userDeleteArtwork", data),
        this.getMyArtworks();
      },
      err => console.error(err)
    );
  }

  /******* UPLOAD OEUVRE *******/
  addPhotoArtwork(event) {
    this.selectedArt = event.target.files;
  }

  createArtwork() {
    if (this.cawDtoForm.valid) { 
      this.artworkService.createArtWork(this.uuDto.id, this.cawDto).subscribe(data => {
        console.log("DATA : ", data);
        this.currentArt = data;
        console.log("CURRENT ART : ", this.currentArt);
        this.artToUpload = this.selectedArt.item(0);
        this.artworkService.addPhotoArtWork(this.currentArt.id, this.artToUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
      } else if (event instanceof HttpResponse) {
        this.isArtUpload = true;
        this.isArtUploadFailed = false;
      }
      this.currentArt = null;
      this.getMyArtworks();
      this.cawDto.name = "";
      this.cawDto.price = null;
      this.cawDto.availability = null;
      this.cawDto.description = null;
      this.cawDto.category = "";
      this.cawDto.subcategory = "";
      this.cawDto.majorColor = "";
      this.cawDto.isSigned = null;
      this.cawDto.hasFrame = null;
      this.cawDto.size = "";
      (<HTMLInputElement>document.getElementById("exampleFormControlFile1")).value = "";
      document.getElementById("dissmissModal").click();
    }, err => {
      this.errorMessage = err.error.message;
      console.log(this.errorMessage);
      this.isArtUpload = false;
      this.isArtUploadFailed = true;
    });
      }, err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isArtUpload = false;
        this.isArtUploadFailed = true;
      });
    }
  }










}
