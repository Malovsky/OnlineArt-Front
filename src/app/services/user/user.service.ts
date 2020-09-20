import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUserDto, UpdateUserPasswordDto } from 'src/app/models/user/user.model';

const APITEST_URL = 'http://localhost:8080/api/test/';
const API_URL  = 'http://localhost:8080/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public host:string = "http://localhost:8080/api/user/";

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(API_URL);
  }

  getAllUsersDtype() {
    return this.http.get(API_URL + 'usersdtype');
  }

  getPublicContent(): Observable<any> {
    return this.http.get(APITEST_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(APITEST_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(APITEST_URL + 'admin', { responseType: 'text' });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(API_URL + id);
  }

  updateUserPassword(updateUserPasswordDto: UpdateUserPasswordDto) {
    const body = JSON.stringify(updateUserPasswordDto);
    return this.http.put(API_URL + 'updatePass', body, httpOptions);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const body = JSON.stringify(updateUserDto);
    return this.http.put(API_URL, body, httpOptions);
  }

  updatePhotoProfile(file: File, id: any): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host + 'updatePhotoProfile/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    })
    return this.http.request(req);
  }

  deleteUser(id: any) {
    return this.http.delete(API_URL + id);
  }

  hasPP(id: any) {
    return this.http.get(API_URL + 'getPhotoProfile/' + id);
  }

  getOwnerById(id: number): Observable<any> {
    return this.http.get(API_URL + "getOwnerById/" + id);
  }

}