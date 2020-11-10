import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.page.html',
  styleUrls: ['./bottom-navigation.page.scss'],
})
export class BottomNavigationPage implements OnInit {

  constructor(
    private router:Router,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
  }



async openCart() {
  //  this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: PanierModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
   //   this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    //  this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
 /*
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }
*/
}
