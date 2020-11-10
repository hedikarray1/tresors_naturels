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
    this.updatePanierStorage();
  }

  getPanierFromServer(id) {

     let  params = {
      user_id: id
    };
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/cart",params);
   return this.http.get(myUrl);

  }

  async updatePanierStorage(){
   await this.getPanierFromServer(5).subscribe((res: any[]) => {
      console.log("add panier au storage",res);
      this.storageService.savePanier(res['data'])  ;
    })
  }

  addToPanierOnServer(id,produits) {

    let  params = {
      user_id: id,
      products : produits
    };
    let url1=environment.apiURL+"wc/v3/addtocart"+"?"+this.WooCommerceService.authenticateApiForPost("POST",environment.apiURL+"wc/v3/addtocart",{});

    let myUrl=this.WooCommerceService.authenticateApiForPost('POST',environment.apiURL+"wc/v3/addtocart",{});
   return this.http.post(url1,params);
  }
  
  
  getCart() {
    return this.storageService.getPanier();
  }
 
  getCartItemCount()  {
  //  return this.storageService.getPanier().length;
  }
 
  addProduct(product) {
    let added = false;
    let panier: any[] = this.storageService.getPanier();
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
    this.storageService.savePanier(panier);
    //this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    let panier : any[] = this.storageService.getPanier();
    let index =0
    for (let  p of panier) {
      if (p.product_id === product.product_id) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          panier.splice(index, 1);
        }
      }
      index++ ;
    }
    this.storageService.savePanier(panier);
   // this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    let panier : any[] = this.storageService.getPanier();
    let index =0
    for (let  p of panier ) {
      if (p.product_id === product.product_id) {
       // this.cartItemCount.next(this.cartItemCount.value - p.amount);
        panier.splice(index, 1);
      }
      index++;
    }
    this.storageService.savePanier(panier);
  }

}
