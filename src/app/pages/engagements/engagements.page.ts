import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.page.html',
  styleUrls: ['./engagements.page.scss'],
})
export class EngagementsPage implements OnInit {

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
