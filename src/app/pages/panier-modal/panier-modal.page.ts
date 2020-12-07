import { GlobalVarServiceService } from './../../services/globalVarService/global-var-service.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { StorageService } from './../../services/storage/storage.service';
import { PanierService } from './../../services/panier/panier.service';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier-modal',
  templateUrl: './panier-modal.page.html',
  styleUrls: ['./panier-modal.page.scss'],
})
export class PanierModalPage implements OnInit {
  panier: any[] = [];
  userState: boolean = false;
  totale: number = 0;
  loaded = false;
  panierModifier = false;
  loading;
  oneCatch = false;


  constructor(
    private panierService: PanierService,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private Router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private loadingCtrl : LoadingController,
    private GLobalVarService:GlobalVarServiceService
  ) { }

  ngOnInit() {
    this.loading =  this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,
     
    });
    this.loading.then((load)=>{
      load.present();
        });
    this.totale = 0;
    this.panierModifier = false;
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();
    });


  }

  ionViewDidEnter() {
   
    this.totale = 0;
    this.panierModifier = false;
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();
    });


  }

  async getPanier() {
    this.panier = [];
    this.loaded = false;
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.getCartFromServer(val.id).then((res: any[]) => {
          this.panier = res['data'];
          console.log('panier : ', this.panier);
          this.totale = parseFloat(res['subtotal']);
          this.loaded = true;
          this.loading.then((load) => {
            load.dismiss();
          });
        }).catch(async (reason) => {
          if (this.oneCatch) {
    
          } else {
            this.oneCatch = true
            this.loading.then((load)=>{
              load.dismiss();
                          });
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

  close() {
    this.modalCtrl.dismiss();
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
            console.log("panier after save", this.panier);
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
            console.log("panier after save", this.panier);
            this.loading.then((load)=>{
              load.dismiss();
                    });
                    this.panierService.getCartItemNbr(val.id).then((d1)=>{
                      this.GLobalVarService.publishSomeData({
                        PanierNbr: d1["data"]
                    });
                  });
          
            this.panierModifier = false;
            this.modalCtrl.dismiss();
            this.Router.navigateByUrl('order');

          })
        })
      })
    }

  }

  doRefresh(event) {
    this.panierModifier = false;
    this.totale = 0;
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();


    });



    setTimeout(() => {
      event.target.complete();
    }, 2000);
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
      this.modalCtrl.dismiss();
      this.Router.navigateByUrl('order');
    }
  }

  goToLogin() {
    this.modalCtrl.dismiss();
    this.Router.navigateByUrl('/login');
  }
}
