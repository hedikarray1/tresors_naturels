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
      return this.http.get(myUrl);


    


  }


  emptyCartFromServer(id) {

  

      let params = {
        user_id: id
      };
      let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/emptyCart", params);
      return this.http.get(myUrl);

    }


  
  addToCartOnServer(produits , id) {

      let params = {
        user_id: id,
        products: produits
      };

      let url1 = environment.apiURL + "wc/v3/addtocart" + "?" + this.WooCommerceService.authenticateApiForPost("POST", environment.apiURL + "wc/v3/addtocart", {});

      return this.http.post(url1, params);


    
  }



  addProductToCartFromStorage(product1) {
    let added = false;
    let product = product1 ;

    this.storage.get('cart-user').then((val) => {
      console.log('cart-user', val);

      let panier: any[] = val;
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
      this.storage.remove('cart-user');
      this.storage.set('cart-user', panier);


    });


  }

  decreaseProductFromCartFromStorage(product) {

    this.storage.get('cart-user').then((val) => {
      console.log('cart-user', val);
      let panier: any[] = val;
      let index = 0
      for (let p of panier) {
        if (p.product_id === product.product_id) {
          p.quantity -= 1;
          if (p.quantity == 0) {
            panier.splice(index, 1);
          }
          break;
        }
        index++;
      }
      this.storage.remove('cart-user');
      this.storage.set('cart-user', panier);

    });
  }

  removeProductFromCartFromStorage(product) {
    this.storage.get('cart-user').then((val) => {
      console.log('cart-user', val);
      let panier: any[] = val;
      let index = 0
      for (let p of panier) {
        if (p.product_id === product.product_id) {

          panier.splice(index, 1);
          break;
        }
        index++;
      }
      this.storage.remove('cart-user');
      this.storage.set('cart-user', panier);

    });

  }

}
