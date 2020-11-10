import { async } from '@angular/core/testing';
import { StorageService } from './../../services/storage/storage.service';
import { PanierService } from './../../services/panier/panier.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier-modal',
  templateUrl: './panier-modal.page.html',
  styleUrls: ['./panier-modal.page.scss'],
})
export class PanierModalPage implements OnInit {

  panier: any[];
  userState: boolean = false;

  constructor(
    private panierService: PanierService,
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) { }

  ngOnInit() {
   this.userState = this.storageService.getUserState();

   
 this.getPanier();
console.log("userState",this.userState);
console.log("panier",this.panier);
  }

 async getPanier(){
    if (this.userState) {
    await  this.panierService.getCartFromServer().subscribe((res: any[]) => {
        this.panier = res['data'];
      })

        } else {
          this.panier = this.panierService.getCartFromStorage();
        }
  }

  decreaseCartItem(product) {
    if (this.userState) {
      let added = false;

      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          p.quantity += 1;
          added = true;
          break;
        }
      }
      if (!added) {
        product.quantity = 1;
        this.panier.push(product);
      }
    } else {
      this.panierService.addProductToCartFromStorage(product);
      this.panier = this.panierService.getCartFromStorage();
    }

  }

  increaseCartItem(product) {
    if (this.userState) {

      let index = 0
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          p.quantity -= 1;
          if (p.quantity == 0) {
            this.panier.splice(index, 1);
          }
          break;
        }
        index++;
      }
    } else {
      this.panierService.decreaseProductFromCartFromStorage(product);
      this.panier = this.panierService.getCartFromStorage();
    }

  }

  removeCartItem(product) {
    if (this.userState) {

      let index = 0
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {

          this.panier.splice(index, 1);
          break;
        }
        index++;
      }
    } else {
      this.panierService.removeProductFromCartFromStorage(product);
      this.panier = this.panierService.getCartFromStorage();
    }

  }

  getTotal() {
    let totale = 0;
    for (let p of this.panier) {
    
      totale = totale + p.quantity*p.product_regular_price ;
            
    }
    return totale;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async save() {
    if (this.userState) {
      await this.panierService.addToCartOnServer(this.panier).subscribe((res: any[]) => {
        console.log("panier", res);
        this.panier = res['data'];
        this.modalCtrl.dismiss();
      })

    } else {
      this.storageService.saveCart(this.panier);
    }

  }

}
