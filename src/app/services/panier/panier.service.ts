import { Storage } from '@ionic/storage';
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
    private WooCommerceService: WoocommerceService,
    private storage: Storage,
    private http: HttpClient
  ) {
  }

  getCartFromServer(id) {
      let params = {
        user_id: id
      };
      let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/cart", params);
      return this.http.get(myUrl).toPromise(); 
  }

  getCartItemNbr(id) {
    let params = {
      user_id: id
    };
    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/cartItemNBR", params);
    return this.http.get(myUrl).toPromise(); 
}


  emptyCartFromServer(id) {

  

      let params = {
        user_id: id
      };
      let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/emptyCart", params);
      return this.http.get(myUrl).toPromise(); 

    }


  
  addToCartOnServer(produits , id) {

      let params = {
        user_id: id,
        products: produits
      };

      let url1 = environment.apiURL + "wc/v3/addtocart" + "?" + this.WooCommerceService.authenticateApiForPost("POST", environment.apiURL + "wc/v3/addtocart", {});

      return this.http.post(url1, params).toPromise(); 


    
  }
  
  addEmtyToCartOnServer( id) {

    let params = {
      user_id: id,
      products: []
    };

    let url1 = environment.apiURL + "wc/v3/addtocart" + "?" + this.WooCommerceService.authenticateApiForPost("POST", environment.apiURL + "wc/v3/addtocart", {});

    return this.http.post(url1, params).toPromise(); 

}


}
