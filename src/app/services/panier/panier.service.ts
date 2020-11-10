import { StorageService } from './../storage/storage.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WoocommerceService } from './../woocommerce.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor(
    private WooCommerceService:WoocommerceService,
    private storageService : StorageService,
    private http: HttpClient
  ) { 
  }

  getCartFromServer() {

     let  params = {
      user_id: this.storageService.getUser().id
    };
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/cart",params);
   return this.http.get(myUrl);

  }

  addToCartOnServer(produits) {

    let  params = {
      user_id: this.storageService.getUser().id,
      products : produits
    };
    let url1=environment.apiURL+"wc/v3/addtocart"+"?"+this.WooCommerceService.authenticateApiForPost("POST",environment.apiURL+"wc/v3/addtocart",{});

   return this.http.post(url1,params);
  }
  



  
  getCartFromStorage() {
    return this.storageService.getCart();
  }
 
 
  addProductToCartFromStorage(product) {
    let added = false;
    let panier: any[] = this.storageService.getCart();
    for (let p of panier) {
      if (p.product_id === product.product_id) {
        p.quantity += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.quantity = 1;
      panier.push(product);
    }
    this.storageService.saveCart(panier);
   
  }
 
  decreaseProductFromCartFromStorage(product) {
    let panier : any[] = this.storageService.getCart();
    let index =0
    for (let  p of panier) {
      if (p.product_id === product.product_id) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          panier.splice(index, 1);
        }
        break ;
      }
      index++ ;
    }
    this.storageService.saveCart(panier);
  }
 
  removeProductFromCartFromStorage(product) {
    let panier : any[] = this.storageService.getCart();
    let index =0
    for (let  p of panier ) {
      if (p.product_id === product.product_id) {
       
        panier.splice(index, 1);
        break ;
      }
      index++;
    }
    this.storageService.saveCart(panier);
  }

}
