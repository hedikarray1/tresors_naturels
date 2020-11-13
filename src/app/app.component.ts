
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { PanierService } from './services/panier/panier.service';
import { PanierModalPage } from './pages/panier-modal/panier-modal.page';
import { Component, OnInit  } from '@angular/core';
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
      title: 'Categories',
      url: 'bottom-navigation/categories',
      icon: 'book'
    },
    {
      title: 'Nos produits',
      url: 'bottom-navigation/all-products',
      icon: 'list'
    },
    {
      title: 'Panier',
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
    private router : Router,
    private fcm:FCM,
    private AlertCTRL:AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if ( this.storageService.getUserState()){
        this.splashScreen.hide();
        this.router.navigateByUrl("bottom-navigation");

      }else {
        this.splashScreen.hide();
      }
          
      this.fcm.getToken().then(async token => {
     

   
        console.log(token);
     const alert =await  this.AlertCTRL.create({
          header : 'FCM token',
          message : token+"" ,
          buttons : ['OK'],
        }) ;
         await alert.present();
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

logOut() {
  this.storageService.signOut();
  this.router.navigateByUrl("login");
}
  
}
