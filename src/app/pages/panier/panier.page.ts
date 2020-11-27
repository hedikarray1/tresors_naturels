import { GlobalVarServiceService } from './../../services/globalVarService/global-var-service.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { PanierService } from './../../services/panier/panier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  panier: any[] = [];
  userState: boolean = false;
  totale: number = 0;
  loaded = false;
  panierModifier = false;
  loading;
  oneCatch = false;

  constructor(
    private Router: Router,
    private panierService: PanierService,
    private storage: Storage,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private GLobalVarService:GlobalVarServiceService
  ) { }


  doRefresh(event) {
   
    this.panierModifier = false;
    this.totale = 0;
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      
      this.getPanier();
      console.log("userState", this.userState);
    
    });

    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



  ionViewDidEnter() {
    //this.presentLoadingCustom();
    
   
  }

  ngOnInit() {
    this.panierModifier = false;
    this.totale = 0;
    this.loading =  this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,
     
    });
    this.loading.then((load)=>{
      load.present();
        });
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();
    });

    console.log("userState", this.userState);
   
  }

  async getPanier() {
    this.loaded = false;
    this.panier = [];
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.getCartFromServer(val.id).then((res: any[]) => {
         
          this.panier = res['data'];
          console.log('panier : ',this.panier);
          this.totale = parseFloat(res['subtotal']);
          this.loaded = true;
          this.loading.then((load) => {
            load.dismiss();
          });
        }).catch(async (reason) => {
          if (this.oneCatch) {
    
          } else {
            this.loading.then((load) => {
              load.dismiss();
            });
            this.oneCatch = true
            const alert = await this.alertController.create({
              header: "Erreur lors du chargement de la page",
              mode: 'ios',
              message: "",
              buttons: [
    
                {
                  text: "D'accord",
                  cssClass: 'btn-alert-connexion',
                  handler: () => {
                    alert.dismiss();
                    this.oneCatch = false;
    
                  }
                },
              ]
            });
            await alert.present();
          }
        });
      });
    }else{
      this.loading.then((load) => {
        load.dismiss();
      });
    }
  }

  incrementCartItem(product) {
    if (this.userState) {
      this.panierModifier = true;
      let index = this.panier.findIndex(x => x.product_id === product.product_id);
      console.log('index', index);
      this.panier[index].quantity += 1;
      this.totale += parseFloat(this.panier[index].price);

    }
  }

  decrementCartItem(product) {
    if (this.userState) {

      this.panierModifier = true;
      let index = this.panier.findIndex(x => x.product_id === product.product_id);
      console.log('index', index);

      if (this.panier[index].quantity === 1) {
        this.showAlertRemoveItem(this.panier[index]);
      } else {
        this.panier[index].quantity -= 1;
        this.totale -= parseFloat(this.panier[index].price);
      }

    }
  }

  removeCartItem(product) {
    if (this.userState) {
      console.log("panier before remove :", this.panier);
      let index = this.panier.findIndex(x => x.product_id === product.product_id);
      console.log('index', index);
      this.totale -= parseFloat(this.panier[index].subtotal);
      this.panier.splice(index, 1);
      console.log("panier after remove :", this.panier);
      this.save();
    }
  }

  async showAlertRemoveItem(product) {
    const alert = await this.alertController.create({
      header: 'Supprimer produit du panier',
      mode: 'ios',
      message: "Ête vous sur de supprimer ce produit du paniner ?",
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'btn-alert-ignorer',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'Oui',
          cssClass: 'btn-alert-connexion',
          handler: () => {
            this.removeCartItem(product);
          }
        },
      ]
    });
    await alert.present();
  }




  async save() {
    console.log("saving");
    if (this.userState) {
      this.loading =  this.loadingCtrl.create({
        spinner: null,
        cssClass: 'custom-loading',
        message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,
       
      });
      this.loading.then((load)=>{
        load.present();
          });
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.emptyCartFromServer(val.id).then((res: any[]) => {
          console.log("empty panier", res);
          this.panierService.addToCartOnServer(this.panier, val.id).then(async (res2: any[]) => {
           
            this.panier = res2['data'];
            console.log("panier after save", this.panier );
            this.loading.then((load)=>{
              load.dismiss();
                    });
              

            this.panierModifier = false;
            const alert = await this.alertController.create({
              header: "Panier sauvegardé",
              mode: 'ios',
              message: "",
              buttons: [
    
                {
                  text: "D'accord",
                  cssClass: 'btn-alert-connexion',
                  handler: () => {
                    alert.dismiss();
                  }
                },
              ]
            });
            this.panierService.getCartItemNbr(val.id).then((d1)=>{
              this.GLobalVarService.publishSomeData({
                PanierNbr: d1["data"]
            });
          });
  
            await alert.present();
          })
        })
      })
    }

  }

  async saveAndCheckout() {
    console.log("saving");
    if (this.userState) {
      this.loading =  this.loadingCtrl.create({
        spinner: null,
        cssClass: 'custom-loading',
        message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,
       
      });
      this.loading.then((load)=>{
        load.present();
          });
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.emptyCartFromServer(val.id).then((res: any[]) => {
          console.log("empty panier", res);
          this.panierService.addToCartOnServer(this.panier, val.id).then(async (res2: any[]) => {
           
            this.panier = res2['data'];
            console.log("panier after save", this.panier );
            this.loading.then((load)=>{
              load.dismiss();
                    });
              
            this.panierModifier = false;
            this.panierService.getCartItemNbr(val.id).then((d1)=>{
              this.GLobalVarService.publishSomeData({
                PanierNbr: d1["data"]
            });
          });
  
              this.Router.navigateByUrl('order');
           
          })
        })
      })
    }

  }

  async checkout() {
   
    if (this.panierModifier) {
      const alert = await this.alertController.create({
        header: 'Vous avez modifié votre panier',
        mode: 'ios',
        message: "Voulez vous sauvgarder votre panier ?",
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            cssClass: 'btn-alert-ignorer',
            handler: () => {
              alert.dismiss();
              this.Router.navigateByUrl('order');
            }
          },
          {
            text: 'Oui',
            cssClass: 'btn-alert-connexion',
            handler: async () => {
              this.saveAndCheckout();
            }
          },
        ]
      });
      await alert.present();
    } else {
      this.Router.navigateByUrl('order');
    }
  }

  goToLogin() {
    this.Router.navigateByUrl('/login');
  }


}
