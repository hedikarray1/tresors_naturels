import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_CART = 'cart-user';
const USER_STATE = 'user-state';

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

  public saveCart(panier :any[]) {
    window.sessionStorage.removeItem(USER_CART);
    window.sessionStorage.setItem(USER_CART, JSON.stringify(panier));
  }

  public getCart() :any[] {
    return JSON.parse(sessionStorage.getItem(USER_CART));
  }

  
  public saveUserState(state) {
    window.sessionStorage.removeItem(USER_STATE);
    window.sessionStorage.setItem(USER_STATE, state);
  }

  public getUserState()  {
    if (sessionStorage.getItem(USER_STATE) == "true")
       return true;
    return false ;
  }
}
