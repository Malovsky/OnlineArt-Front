import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const API_URL  = 'http://localhost:8080/api/order/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  public host:string = "http://localhost:8080/api/order/";

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get(API_URL);
  }

  deleteCommande(id: any) {
    return this.http.delete(API_URL + id);
  }

}
