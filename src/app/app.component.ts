//import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
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
      title: 'Panier',
      url: 'bottom-navigation/panier',
      icon: 'cart'
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


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private storageService : StorageService,
    private router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
  /*/    this.fcm.getToken().then(token => {
        console.log(token);
        // send token to the server
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');

        } else {
          console.log('Received in foreground');
        }
      });
*/
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('bottom-navigation/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

  
   // this.storageService.saveUser(user);
   // this.storageService.saveUserState(true);

    console.log("user connecte",this.storageService.getUser());
    console.log("user connecte",this.storageService.getUserState());
  
  }

  
  
goTo(link) {
  this.router.navigateByUrl(link);
}
  
}
