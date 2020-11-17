import { Storage } from '@ionic/storage';

//import { FCM } from '@ionic-native/fcm/ngx'
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Router } from '@angular/router';
import { PanierService } from './services/panier/panier.service';
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import { PanierModalPage } from './pages/panier-modal/panier-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
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
      title: 'Accueil',
      url: 'bottom-navigation/home',
      icon: 'home'
    },
    {
      title: 'Catalogue',
      url: 'bottom-navigation/categories',
      icon: 'book'
    },
    {
      title: 'Boutique',
      url: 'bottom-navigation/all-products',
      icon: 'list'
    },
    {
      title: 'Mon Panier',
      url: 'bottom-navigation/panier',
      icon: 'cart'
    },
    {
      title: 'Mes commandes',
      url: 'bottom-navigation/my-orders',
      icon: 'receipt'
    },
    {
      title: 'Compte',
      url: 'bottom-navigation/account',
      icon: 'person'
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
  ];


  public labels = [
    {
      title: 'Account',
      url: 'bottom-navigation/account',
      icon: 'person'
    },
    {
      title: 'Déconnexion',
      url: 'bottom-navigation/contactez-nous',
      icon: 'log-out'
    },

  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private storage: Storage,
    private router: Router,
    //private fcm: FCM,
    private firebaseX:FirebaseX,
    private AlertCTRL: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.storage.get('user-state').then((val) => {
        console.log('user state', val);
        if (val === true) {
          this.splashScreen.hide();
          this.router.navigateByUrl("bottom-navigation");

        } else {
          this.splashScreen.hide();
        }
      });


     this.firebaseX.getToken().then(async token => {



        console.log(token);
        const alert = await this.AlertCTRL.create({
          header: 'FCM token',
          message: token + "",
          buttons: ['OK'],
        });
        await alert.present();
        // send token to the server
      });

      this.firebaseX.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));

      this.firebaseX.onMessageReceived().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');

        } else {
          console.log('Received in foreground');
        }
      });

    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('bottom-navigation/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }


    // this.storageService.saveUser(user);
    // this.storageService.saveUserState(true);

    this.storage.get('user-state').then((val) => {
      console.log('user state', val);

    });


    this.storage.get('auth-user').then((val) => {
      console.log('auth-user', val);

    });


  }



  goTo(link) {
    this.router.navigateByUrl(link);
  }

  logOut() {
    this.storage.clear();
    this.router.navigateByUrl("login");
  }

}
