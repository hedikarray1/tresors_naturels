import { GlobalVarServiceService } from './services/globalVarService/global-var-service.service';
import { Network } from '@ionic-native/network/ngx';
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
    /* {
       title: 'Contactez nous',
       url: 'bottom-navigation/contactez-nous',
       icon: 'mail'
     }*/
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
    private firebaseX: FirebaseX,
    private GLobalVarService:GlobalVarServiceService,
  
  ) {

    this.GLobalVarService.getObservableUserState().subscribe((data) => {
      //  console.log('Data received', data);
      this.userState = data.UserState;
    });

    this.initializeApp();

    this.firebaseX.getToken().then(async token => {
      console.log(token);

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

    });
  }

  ngOnInit() {

    const path = window.location.pathname.split('bottom-navigation/')[1];
  

    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
    });
    this.GLobalVarService.getObservableUserState().subscribe((data) => {
      //  console.log('Data received', data);
      this.userState = data.UserState;
    });


  }

  ionViewDidLoad() {
    const path = window.location.pathname.split('bottom-navigation/')[1];
    console.log("page path", path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
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
