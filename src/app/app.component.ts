import { BottomNavigationPage } from './pages/bottom-navigation/bottom-navigation.page';
import { InternetEstablishedPage } from './pages/internet-established/internet-established.page';
import { NoInternetPage } from './pages/no-internet/no-internet.page';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { Storage } from '@ionic/storage';

import { Router } from '@angular/router';
import { PanierService } from './services/panier/panier.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  panier: any[] = [];
  userState: boolean = false;
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
    }
  ];



  public goneOffline = false;





  public modal = this.modalCtrl.create({
    component: NoInternetPage,
    cssClass: 'no-connection-modal'
  });



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private storage: Storage,
    private router: Router,
    //private fcm: FCM,
    private firebaseX: FirebaseX,
    private AlertCTRL: AlertController,
    private panierService: PanierService,
    private loadingCtrl: LoadingController,
    private network:Network
  ) {

    this.initializeApp();

// watch network for a disconnection mobile
let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
 
  //Do task when no internet connection
  this.modal = this.modalCtrl.create({
    component: NoInternetPage,
    cssClass: 'no-connection-modal'
  });
  this.modal.then((mod) => {
    mod.present();
  });
  this.goneOffline = true;


  
});

// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection mobile
let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.

  
  setTimeout(() => {
    if (this.network.type === 'wifi') {
     
      if (this.goneOffline) {
        this.goneOffline = false;

        this.modal.then((mod) => {
          mod.dismiss();
        });

        this.modal = this.modalCtrl.create({
          component: InternetEstablishedPage,
          cssClass: 'no-connection-modal'
        });
        this.modal.then((mod) => {
          mod.present();
        });


      }
    
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();



    //check offline or online for web
    window.addEventListener('offline', () => {
      //Do task when no internet connection
      this.modal = this.modalCtrl.create({
        component: NoInternetPage,
        cssClass: 'no-connection-modal'
      });
      this.modal.then((mod) => {
        mod.present();
      });
      this.goneOffline = true;
    });

    window.addEventListener('online', () => {
      //Do task when internet connection returns
      console.log("online");

      if (this.goneOffline) {
        this.goneOffline = false;

        this.modal.then((mod) => {
          mod.dismiss();
        });

        this.modal = this.modalCtrl.create({
          component: InternetEstablishedPage,
          cssClass: 'no-connection-modal'
        });
        this.modal.then((mod) => {
          mod.present();
        });


      }

    });
  }





  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();


      this.splashScreen.hide();
      // this.router.navigateByUrl("bottom-navigation");




      this.firebaseX.getToken().then(async token => {

        console.log(token);
        /* const alert = await this.AlertCTRL.create({
           header: 'FCM token',
           message: token + "",
           buttons: ['OK'],
         });*/
        // await alert.present();
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
      this.userState = val;
    });


    this.storage.get('auth-user').then((val) => {
      console.log('auth-user', val);
      this.panierService.addEmtyToCartOnServer(val.id);
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
