import { AlertController, LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { StorageService } from './../../services/storage/storage.service';
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
loaded=false;
loading;
  constructor(
    private Router: Router,
    private panierService: PanierService,
    private storage: Storage,
    private alertController: AlertController,
    private loadingCtrl:LoadingController
  ) { }


  doRefresh(event) {
    console.log('Begin async operation');
   
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();
      console.log("userState", this.userState);
      console.log("panier", this.panier);
    });
  
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



  ionViewDidEnter() {
    //this.presentLoadingCustom();
    this.loading =  this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/Spinner1.gif"  style="background: transparent !important;"/>`,
     
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
    console.log("panier", this.panier);
  }

  ngOnInit() {

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();
    });
   
    console.log("userState", this.userState);
    console.log("panier", this.panier);
  }

  async getPanier() {
    this.loaded=false;
    this.panier= [];
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.getCartFromServer(val.id).then((res: any[]) => {
          this.panier = res['data'];
          this.totale = parseFloat(res['subtotal']);
          this.loaded=true;
          this.loading.then((load)=>{
load.dismiss();
          });
        })
      });
    } 
  }

  incrementCartItem(product) {
    if (this.userState) {
      let added = false;

      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          p.quantity += 1;
          this.totale += parseFloat(p.price);
          added = true;
          break;
        }
      }
    } 
  }

  decrementCartItem(product) {
    if (this.userState) {

      let index = 0
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          p.quantity -= 1;
          this.totale -= parseFloat(p.price);
          if (p.quantity == 0) {
            this.panier.splice(index, 1);
          }
          break;
        }
        index++;
      }

    } 
  }

  removeCartItem(product) {
    if (this.userState) {

      let index = 0 ;
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          this.totale -= parseFloat(p.subtotal);
          this.panier.splice(index, 1);
          break;
        }
        index++;
      }
    } 
  }

 async showAlertRemoveItem(product){
    const alert = await this.alertController.create({
      header: 'Supprimer produit du panier',
      mode: 'ios',
      message: "Ete  vous sur de supprimer ce produit du paniner ?",
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
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.emptyCartFromServer(val.id).then((res: any[]) => {
          console.log("empty panier", res);
          this.panierService.addToCartOnServer(this.panier, val.id).then((res: any[]) => {
            console.log("panier", res);
            this.panier = res['data'];
            //  this.modalCtrl.dismiss();
          })
        })
      })
    } 

  }

  checkout() {
    this.Router.navigateByUrl('order');

  }

  goToLogin() {
    this.Router.navigateByUrl('/login');
  }


  async presentLoadingCustom() {
    let loading = await this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/Spinner1.gif"  style="background: transparent !important;"/>`,
      duration: 5000,
    });
    loading.present();
  }

}
