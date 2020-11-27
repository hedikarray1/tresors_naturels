import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { CategoryService } from './../../services/category/category.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MbscListviewOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categorys: any[];
  shownCategory: any;
  rep = /&amp;/gi;
  loading;
  oneCatch = false;


  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private categoryService: CategoryService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  async ionViewDidEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });
    // this.presentLoadingCustom();
    await this.getCategory();
  }

  async openCart() {


    let modal = await this.modalCtrl.create({
      component: PanierModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }

  async ngOnInit() {
    await this.getCategory();

  }


  async doRefresh(event) {
    console.log('Begin async operation');
    await this.getCategory();
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async getCategory() {

    this.categoryService.getParentCategory().then((data: any[]) => {

      this.categorys = data;
      for (let cat of this.categorys) {

        this.categoryService.getSousCategory(cat.id).then((data2: any[]) => {

          this.loading.then((load) => {
            load.dismiss();
          });
          cat.children = data2;
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


      console.log("category :", this.categorys);
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

  listviewSettings: MbscListviewOptions = {
    swipe: false,
    enhance: true
  };



  showCategory(category) {
    if (this.isCategoryShown(category)) {
      this.shownCategory = null;
    } else {
      this.shownCategory = category;
    }
  };

  isCategoryShown(category) {
    return this.shownCategory === category;
  };

  goToProductByCategory(category, id) {
    this.router.navigateByUrl('bottom-navigation/product-by-category/' + category + "/" + id);
  }


}
