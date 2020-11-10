import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_CART = 'cart-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user :any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() :any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public savePanier(panier :any[]) {
    window.sessionStorage.removeItem(USER_CART);
    window.sessionStorage.setItem(USER_CART, JSON.stringify(panier));
  }

  public getPanier() :any[] {
    return JSON.parse(sessionStorage.getItem(USER_CART));
  }
}
