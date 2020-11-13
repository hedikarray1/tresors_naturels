import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_CART = 'cart-user';
const USER_STATE = 'user-state';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private storage: Storage) { }
/*
  signOut() {

    this.storage.clear();
  }


  public saveToken(token: string) {

    this.storage.remove(TOKEN_KEY);
    this.storage.set(TOKEN_KEY, token);
  }

  public getToken() {
    return this.storage.get(TOKEN_KEY).then((val) => {
      return val;
    });

  }

  public saveUser(user: any) {


    this.storage.remove(USER_KEY);
    this.storage.set(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return this.storage.get(USER_KEY).then((val) => {
      return val;
    });
  }

  public saveCart(panier: any[]) {

    this.storage.remove(USER_CART);
    this.storage.set(USER_CART, JSON.stringify(panier));
  }

  public getCart(): any {
    return this.storage.get(USER_CART).then((val) => {
      return val;
    });
  }


  public saveUserState(state) {

    this.storage.remove(USER_STATE);
    this.storage.set(USER_STATE, state);
  }

 async  getUserState(): any {
    let st: boolean = false;

    await this.storage.get(USER_STATE).then((val) => {

      st = val;

    });
    return st;
  }
  */
}
