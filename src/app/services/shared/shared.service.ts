import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public isLoggedIn$: BehaviorSubject<any> = new BehaviorSubject(null);
  public showAdminBoard$: BehaviorSubject<any> = new BehaviorSubject(null);
  public showUserBoard$: BehaviorSubject<any> = new BehaviorSubject(null);

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username: string;

  constructor(private tokenService: TokenService) { }

  toDoOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
  }

  public sendLogged(isLoggedIn: boolean) {
    this.isLoggedIn$.next(isLoggedIn);
  }

  public getLogged(): Observable<any> {
    return this.isLoggedIn$.asObservable();
  }

  public sendAdminBoard(showAdminBoard: boolean) {
    this.showAdminBoard$.next(showAdminBoard);
  }

  public getAdminBoard(): Observable<any> {
    return this.showAdminBoard$.asObservable();
  }

}

/* 

public observeBasket$: BehaviorSubject<any> = new BehaviorSubject(null);

  public sendPanier(panier: number) {
      this.observeBasket$.next(panier);
  }

  clearPanier() {
      this.subject.next();
  }

  public getPanier(): Observable<any> {
      return this.observeBasket$.asObservable();
  }

*/