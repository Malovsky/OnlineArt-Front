import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CustomerCommandDTO } from 'src/app/models/orderItem/order-item.model';

const API_URL  = 'http://localhost:8080/api/order/';
const API_URL_ORDER_ITEM = 'http://localhost:8080/api/orderItem/';

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

  getMyOrders(id: any) {
    return this.http.get(API_URL + "myOrders/" + id)
  }

  deleteCommande(id: any) {
    return this.http.delete(API_URL + id);
  }

  passCommande(ccDto: CustomerCommandDTO) {
    const body = JSON.stringify(ccDto);
    return this.http.post(API_URL_ORDER_ITEM + 'itemOrderCustomerQuantity', body, httpOptions);
  }
}
