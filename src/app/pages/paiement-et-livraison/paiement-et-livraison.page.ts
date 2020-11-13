import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paiement-et-livraison',
  templateUrl: './paiement-et-livraison.page.html',
  styleUrls: ['./paiement-et-livraison.page.scss'],
})
export class PaiementEtLivraisonPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async openCart() {
 
 
    let modal = await this.modalCtrl.create({
      component: PanierModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }
}
