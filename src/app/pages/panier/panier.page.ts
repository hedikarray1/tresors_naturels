import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { StorageService } from './../../services/storage/storage.service';
import { PanierService } from './../../services/panier/panier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  panier: any[] = [];
  userState: boolean = false;
  totale: number = 0;

  constructor(
    private Router: Router,
    private panierService: PanierService,
    private storageService: StorageService,
    private storage: Storage
  ) { }

  ionViewDidEnter() {

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });
    this.getPanier();
    console.log("userState", this.userState);
    console.log("panier", this.panier);
  }

  ngOnInit() {

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });
    this.getPanier();
    console.log("userState", this.userState);
    console.log("panier", this.panier);
  }

  async getPanier() {
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.getCartFromServer(val.id).subscribe((res: any[]) => {
          this.panier = res['data'];
          this.getTotal();
        })
      });
    } else {
      //  this.panier = this.panierService.getCartFromStorage();
      this.getTotal();
    }

  }

  incrementCartItem(product) {
    if (this.userState) {
      let added = false;

      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          p.quantity += 1;
          this.totale += p.price * 1;
          added = true;
          break;
        }
      }
    } else {
      this.panierService.addProductToCartFromStorage(product);
      //  this.panier = this.panierService.getCartFromStorage();
      this.totale += product.price;
    }

  }

  decrementCartItem(product) {
    if (this.userState) {

      let index = 0
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          p.quantity -= 1;
          this.totale -= p.price;
          if (p.quantity == 0) {
            this.panier.splice(index, 1);
          }
          break;
        }
        index++;
      }

    } else {
      this.panierService.decreaseProductFromCartFromStorage(product);
      // this.panier = this.panierService.getCartFromStorage();
      this.totale -= product.price;
    }

  }

  removeCartItem(product) {
    if (this.userState) {

      let index = 0
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          this.totale -= p.total;
          this.panier.splice(index, 1);
          break;
        }
        index++;
      }
    } else {
      this.totale -= product.total;
      this.panierService.removeProductFromCartFromStorage(product);
      //  this.panier = this.panierService.getCartFromStorage();
    }

  }

  getTotal() {
    this.totale = 0
    for (let p of this.panier) {

      this.totale += p.total;

    }
  }



  async save() {
    console.log("saving");
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.emptyCartFromServer(val.id).subscribe((res: any[]) => {
          console.log("empty panier", res);
          this.panierService.addToCartOnServer(this.panier, val.id).subscribe((res: any[]) => {
            console.log("panier", res);
            this.panier = res['data'];
            //  this.modalCtrl.dismiss();
          })
        })
      })
      /*
             this.panierService.addToCartOnServer(this.panier).subscribe((res: any[]) => {
              console.log("panier", res);
              this.panier = res['data'];
          
            })
            */

    } else {
      this.storage.remove('cart-user');
      this.storage.set('cart-user', this.panier);
    }

  }

  checkout() {
    this.Router.navigateByUrl('order');

  }

}
