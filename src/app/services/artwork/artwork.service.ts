import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateArtWorkDto } from 'src/app/models/artwork/artwork.model';

const API_URL  = 'http://localhost:8080/api/artwork/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  public host:string = "http://localhost:8080/api/artwork/";

  constructor(private http: HttpClient) { }

  getAllArtworks() {
    return this.http.get(API_URL);
  }

  createArtWork(id: any, cawDto: CreateArtWorkDto) {
    const body = JSON.stringify(cawDto);
    return this.http.post(API_URL + 'addMyArtwork/' + id, body, httpOptions);
  }

  addPhotoArtWork(id: any, file: File): Observable<HttpEvent<{}>>  {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', API_URL + 'addPhotoArtwork/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    })
    return this.http.request(req);
  }

  getMyArtworks(id: any) {
    return this.http.get(API_URL + 'myArt/' + id );
  }

  deleteArtwork(id: any) {
    return this.http.delete(API_URL + id);
  }

}
