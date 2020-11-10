import { StorageService } from './../../services/storage/storage.service';
import { PanierService } from './../../services/panier/panier.service';
import {  ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier-modal',
  templateUrl: './panier-modal.page.html',
  styleUrls: ['./panier-modal.page.scss'],
})
export class PanierModalPage implements OnInit {

  panier : any[];

  constructor(
    private panierService: PanierService,
    private modalCtrl: ModalController,
    private storageService : StorageService
  ) { }

  ngOnInit() {
    this.panierService.updatePanierStorage();
    this.panier = this.panierService.getCart();
  }

  
 
  decreaseCartItem(product) {
    this.panierService.decreaseProduct(product);
    this.panier = this.panierService.getCart();
  }
 
  increaseCartItem(product) {
    this.panierService.addProduct(product);
    this.panier = this.panierService.getCart();
  }
 
  removeCartItem(product) {
    this.panierService.removeProduct(product);
    this.panier = this.panierService.getCart();
  }
 
  getTotal() {
    return this.panier.reduce((i, j) => i + j.product_regular_price * j.quantity, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async checkout() {
    // Perfom PayPal or Stripe checkout process
 
   await this.panierService.addToPanierOnServer(5,this.panier).subscribe((res: any[]) => {
      console.log("panier",res);
      this.panier = res['data'] ;
      this.storageService.savePanier(this.panier);
      this.modalCtrl.dismiss();
    })
     
    
  }

}
