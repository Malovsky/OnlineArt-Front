import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User, CreateUserDto } from 'src/app/models/user/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  isUsernameDispo = true;
  isEmailDispo = true;
  isUsernamePassSame = false;
  errorMessage = '';

  cuDto: CreateUserDto;
  public currentUser: User;
  @ViewChild('cuDtoForm', { static: false }) ngForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.cuDto = new CreateUserDto();
  }

  onSignup() {
    if (this.ngForm.valid) {
      this.authService.register(this.cuDto).subscribe(data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      }, err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        if (this.errorMessage == "Ce nom d'utilisateur est déjà utilisé !") {
          this.isUsernameDispo = false;
          this.isEmailDispo = true;
          this.isUsernamePassSame = false;
        } else if (this.errorMessage == "Cet email est déjà utilisé !") {
          this.isEmailDispo = false;
          this.isUsernameDispo = true;
          this.isUsernamePassSame = false;
        } else if (this.errorMessage == "Votre nom d'utilisateur et votre mot de passe ne peut être identique !") {
          this.isEmailDispo = true;
          this.isUsernameDispo = true;
          this.isUsernamePassSame = true;
        }
      });
    }
  }

}
