import { PanierService } from './services/panier/panier.service';
import { PanierModalPage } from './pages/panier-modal/panier-modal.page';
import { Component, OnInit  } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: 'bottom-navigation/home',
      icon: 'home'
    },
    {
      title: 'Categories',
      url: 'bottom-navigation/categories',
      icon: 'book'
    },
    {
      title: 'Nous produits',
      url: 'bottom-navigation/all-products',
      icon: 'list'
    },
    {
      title: 'Engagements',
      url: 'bottom-navigation/engagements',
      icon: 'document-text'
    },
    {
      title: 'Qui sommes nous',
      url: 'bottom-navigation/qui-sommes-nous',
      icon: 'information-circle'
    },
    {
      title: 'Paiement et livraison',
      url: 'bottom-navigation/paiement-et-livraison',
      icon: 'pricetag'
    },
    {
      title: 'Contactez nous',
      url: 'bottom-navigation/contactez-nous',
      icon: 'mail'
    }, 
    {
      title: 'Account',
      url: 'bottom-navigation/account',
      icon: 'person'
    }, 
    {
      title: 'Deconnecter',
      url: 'bottom-navigation/contactez-nous',
      icon: 'log-out'
    },
  ];
  public labels = [
    {
      title: 'Account',
      url: 'bottom-navigation/account',
      icon: 'person'
    }, 
    {
      title: 'Deconnecter',
      url: 'bottom-navigation/contactez-nous',
      icon: 'log-out'
    },
    
];


   cart = [];
  cartItemCount: number ;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private panierService : PanierService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('bottom-navigation/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.cart = this.panierService.getCart();
   // this.cartItemCount = this.panierService.getCartItemCount();
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
