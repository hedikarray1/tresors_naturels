import { Storage } from '@ionic/storage';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { PopoverCardProductPage } from './../popovers/popover-card-product/popover-card-product.page';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.page.html',
  styleUrls: ['./product-by-category.page.scss'],
})
export class ProductByCategoryPage implements OnInit {

  products: any[];
  category: any;
  idCategory: any;
  page = 1;
  count = null;
  rep = /&amp;/gi;

  oneCatch = false;

  userState: boolean = false;
  loading;
  constructor(
    private poductService: ProductService,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private router: Router,
    private modalCtrl: ModalController,
    private storage: Storage,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ionViewDidEnter() {

    //   this.presentLoadingCustom();
    
  }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });
    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
    });
    this.category = this.route.snapshot.paramMap.get('category');
    this.idCategory = this.route.snapshot.paramMap.get('id');
    this.getCategory()
  }
  
  doRefresh(event) {
    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
    });
    this.category = this.route.snapshot.paramMap.get('category');
    this.idCategory = this.route.snapshot.paramMap.get('id');
    this.getCategory()
  
    setTimeout(() => {
      event.target.complete();
    }, 2000);
   
  }

  async getCategory() {
    this.products = [];
    this.poductService.getProductByCategoryCustom(this.idCategory).then((data: any[]) => {
      
      this.products = data;
      console.log("category :", this.products);
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


  goToDetail(id) {
    this.router.navigateByUrl('detail-produit/' + id);
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
      if (product.type === 'variable') {
        this.goToDetail(product.id);
      } else {
        this.showPopoverPanier(event, product);
      }
    } else {
      this.showAlertLogin();
    }
  }


  async showAlertLogin() {

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
            this.router.navigateByUrl('/login');
          }
        },
      ]
    });
    await alert.present();
  }


}
