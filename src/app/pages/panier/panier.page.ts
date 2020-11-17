import { AlertController } from '@ionic/angular';
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

  constructor(
    private Router: Router,
    private panierService: PanierService,
    private storage: Storage,
    private alertController: AlertController
  ) { }

  ionViewDidEnter() {

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });
    this.getPanier();
    console.log("userState", this.userState);
    console.log("panier", this.panier);
  }

  ngOnInit() {

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });
    this.getPanier();
    console.log("userState", this.userState);
    console.log("panier", this.panier);
  }

  async getPanier() {
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.getCartFromServer(val.id).subscribe((res: any[]) => {
          this.panier = res['data'];
          this.getTotal();
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
          this.totale += p.price * 1;
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
          this.totale -= p.price;
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

      let index = 0
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          this.totale -= p.total;
          this.panier.splice(index, 1);
          break;
        }
        index++;
      }
    } 
  }

 async showAlertRemoveItem(){
    const alert = await this.alertController.create({
      header: 'Vous devez vous connecter',
      mode: 'ios',
      message: "Vous devez disposer d'un compte pour pouvoir passer un commande ou ajouter au panier .",
      buttons: [
        {
          text: 'ignorer',
          role: 'cancel',
          cssClass: 'btn-alert-ignorer',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'connexion',
          cssClass: 'btn-alert-connexion',
          handler: () => {
            
          }
        },
      ]
    });
    await alert.present();
  }

  getTotal() {
    this.totale = 0
    for (let p of this.panier) {

      this.totale += p.total;

    }
  }



  async save() {
    console.log("saving");
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.emptyCartFromServer(val.id).subscribe((res: any[]) => {
          console.log("empty panier", res);
          this.panierService.addToCartOnServer(this.panier, val.id).subscribe((res: any[]) => {
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
}
