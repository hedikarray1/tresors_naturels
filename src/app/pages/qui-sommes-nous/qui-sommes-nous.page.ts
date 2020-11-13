import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qui-sommes-nous',
  templateUrl: './qui-sommes-nous.page.html',
  styleUrls: ['./qui-sommes-nous.page.scss'],
})
export class QuiSommesNousPage implements OnInit {

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
