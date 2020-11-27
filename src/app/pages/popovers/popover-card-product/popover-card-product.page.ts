import { GlobalVarServiceService } from './../../../services/globalVarService/global-var-service.service';
import { Storage } from '@ionic/storage';
import { PanierService } from './../../../services/panier/panier.service';
import { StorageService } from './../../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-popover-card-product',
  templateUrl: './popover-card-product.page.html',
  styleUrls: ['./popover-card-product.page.scss'],
})
export class PopoverCardProductPage implements OnInit {

  userState: boolean = false;
  itemQty = 1;
  product: any;
  id: any;
  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams,
    private panierService: PanierService,
    private storageService: StorageService,
    private storage: Storage,
    private alertController: AlertController,
    private GLobalVarService:GlobalVarServiceService
  ) { }

  ngOnInit() {
    this.id = this.navParams.data.id;
    this.product = this.navParams.data.product;
    console.log("all data", this.navParams.data);
    console.log("product", this.product);
    console.log("id", this.id);

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });


  }
  close() {
    this.popoverController.dismiss();
  }

 async addToCart(p) {
    console.log("adding to cart");
    let product = [
      {
        "product_id": p.id,
        "variation_id": 0,
        "quantity": this.itemQty
      }
    ]
    console.log("saving");
    if (this.userState) {

      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.addToCartOnServer(product, val.id).then((res: any[]) => {
          console.log("panier", res);
          this.panierService.getCartItemNbr(val.id).then((d1)=>{
            this.GLobalVarService.publishSomeData({
              PanierNbr: d1["data"]
          });
        });

        })
      });
    } else {


    }
    this.popoverController.dismiss();

    const alert = await this.alertController.create({
      header: "Produit ajouté au panier",
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
    await alert.present();
  }



  addItem() {
    this.itemQty += 1
  }

  removeItem() {
    if (this.itemQty > 1) {
      this.itemQty -= 1;
    }
  }
}
