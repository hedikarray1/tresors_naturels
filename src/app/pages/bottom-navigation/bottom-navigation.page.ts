import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { PanierService } from './../../services/panier/panier.service';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.page.html',
  styleUrls: ['./bottom-navigation.page.scss'],
})
export class BottomNavigationPage implements OnInit {

  panierNbr: number = 0;
  userState: boolean = false;
  mySubscription: Subscription

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private panierService: PanierService,
    private storage: Storage
  ) {

    
//realtime badge
this.mySubscription= interval(1000).subscribe((x =>{
//  console.log("real time panier nbr: ");
 this.getPanierNbr();
}));
   }

  async ngOnInit() {

    await this.storage.get('user-state').then(async (val) => {
      console.log('user state', val);
      this.userState = val;
      await this.getPanierNbr();
    });

  }

  async ionViewDidEnter() {

    await this.storage.get('user-state').then(async (val) => {
      console.log('user state', val);
      this.userState = val;
      await this.getPanierNbr();
    });

  }



  public async getPanierNbr() {
    if (this.userState) {
      await this.storage.get('auth-user').then(async (val) => {
      //  console.log('auth-user', val);
        await this.panierService.getCartItemNbr(val.id).then((res: any[]) => {
        //  console.log('panier item nbr', res['data']);
          this.panierNbr = res['data'];

        })
      });
    }
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


  logOut() {
    this.storage.clear();
    this.router.navigateByUrl("login");
  }
}
