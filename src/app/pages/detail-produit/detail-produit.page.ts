import { GlobalVarServiceService } from './../../services/globalVarService/global-var-service.service';
import { PopoverCardProductPage } from './../popovers/popover-card-product/popover-card-product.page';
import { Storage } from '@ionic/storage';
import { PanierService } from './../../services/panier/panier.service';
import { StorageService } from './../../services/storage/storage.service';
import { LoadingController, AlertController, PopoverController } from '@ionic/angular';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.page.html',
  styleUrls: ['./detail-produit.page.scss'],
})
export class DetailProduitPage implements OnInit {

  segmentValue = "";
  datashow = false;
  itemQty = 1;
  variations: any[] = []
  relatedProducts: any[] = [];
  variationId = 0
  userState: boolean = false;
  product: any;
  rep = /&amp;/gi;
  loading;

  oneCatch = false;
  constructor(

    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private ProductService: ProductService,
    private panierService: PanierService,
    private storageService: StorageService,
    private storage: Storage,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private GLobalVarService: GlobalVarServiceService

  ) { }

  async ngOnInit() {
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });

    this.getProductById();
  }

  getProductById() {

    this.ProductService.getProductCustom(this.route.snapshot.paramMap.get('id')).then((data: any) => {
      console.log(data);
      this.product = data;
      this.setSegmentValue();
      if (this.product.type == "variable") {
        this.getVariation(this.product.variations);
      }
      this.datashow = true;
      this.loading.then((load) => {
        load.dismiss();
      });
    }).catch(async (reason) => {
      console.log("error ", reason);
      if (this.oneCatch) {

      } else {
        this.oneCatch = true

        this.loading.then((load) => {
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
  }

  async doRefresh(event) {

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });

    this.getProductById();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  
  }


  async getVariation(variationsss) {
    console.log("variations");
    this.variations = [];
    for (let v of variationsss) {
      await this.ProductService.getproduct(v).then((data: any) => {
        console.log(data);
        let vv = {
          option: data?.attributes[0]?.option,
          id: v
        }
        let index = this.variations.findIndex(x => x.id === v);
        console.log("variation index", index);
        if (index == -1) {
          this.variations.push(vv);
        }

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
    }
    console.log("variation table :", this.variations);
  }



  setSegmentValue() {
    if (this.product?.description != '') {
      this.segmentValue = "description";
    } else if (this.product?.short_description != '') {
      this.segmentValue = "information";
    } else if (this.product?.attributes != '') {
      this.segmentValue = "information";
    }

  }

  addItem() {
    if (this.userState) {
      this.itemQty += 1
    } else {
      this.showAlertLogin();
    }

  }

  removeItem() {
    if (this.userState) {
      if (this.itemQty > 1) {
        this.itemQty -= 1;
      }
    } else {
      this.showAlertLogin();
    }
  }

  addToCart() {

    console.log("adding to cart");
    let product = [
      {
        "product_id": this.product.id,
        "variation_id": 0,
        "quantity": this.itemQty
      }
    ]
    console.log("saving");
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.addToCartOnServer(product, val.id).then(async (res: any[]) => {
          console.log("panier", res);
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

          this.panierService.getCartItemNbr(val.id).then((d1) => {
            this.GLobalVarService.publishSomeData({
              PanierNbr: d1["data"]
            });
          });

        });
      });
    } else {

      this.showAlertLogin();
    }

  }


  goToDetail(id) {
    this.router.navigateByUrl('detail-produit/' + id);
  }




  addToCartWithVariation(id) {
    console.log("variation selected id", id);
    console.log("adding to cart");
    let product = [
      {
        "product_id": this.product.id,
        "variation_id": id,
        "quantity": this.itemQty
      }
    ]
    console.log("saving");
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.addToCartOnServer(product, val.id).then(async (res: any[]) => {
          console.log("panier", res);
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
          this.panierService.getCartItemNbr(val.id).then((d1) => {
            this.GLobalVarService.publishSomeData({
              PanierNbr: d1["data"]
            });
          });

          await alert.present();
        })
      })
    } else {
      this.showAlertLogin();
    }

  }

  async showAlertLogin() {

    const alert = await this.alertController.create({
      header: 'Vous devez vous connecter',
      mode: 'ios',
      message: "Vous devez disposer d'un compte pour pouvoir passer une commande ou ajouter au panier .",
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
            this.router.navigateByUrl('/login');
          }
        },
      ]
    });
    await alert.present();
  }

  async showPopoverPanier(event: MouseEvent, product) {
    const popover = await this.popoverController.create({
      component: PopoverCardProductPage,
      componentProps: {
        "id": product.id,
        "product": product,
      },
      translucent: true
    });
    return popover.present();
  }

  showPopover(event: MouseEvent, product) {
    if (this.userState) {
      this.showPopoverPanier(event, product);
    } else {
      this.showAlertLogin();
    }
  }


}
