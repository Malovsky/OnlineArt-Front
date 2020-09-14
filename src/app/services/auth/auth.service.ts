import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, CreateUserDto } from 'src/app/models/user/user.model';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser(loginRequest: LoginRequest) {
    const body = JSON.stringify(loginRequest);
    return this.http.post(AUTH_API + 'signin', body, httpOptions);
  }

  register(createUserDto: CreateUserDto) {
    const body = JSON.stringify(createUserDto);
    return this.http.post(AUTH_API + 'signup', body, httpOptions);
  }

}
