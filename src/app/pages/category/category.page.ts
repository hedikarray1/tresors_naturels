import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { CategoryService } from './../../services/category/category.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

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

  async ngOnInit() {
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });
  
     this.getCategory();

  }


  async doRefresh(event) {
    console.log('Begin async operation');
     this.getCategory();

    setTimeout(() => {
      event.target.complete();
    }, 2000);

  }

  async getCategory() {

    this.categoryService.getCatalogueCustom().subscribe((data: any[]) => {

      this.categorys = data;
      this.loading.then((load) => {
        load.dismiss();
      });
      console.log("category :", this.categorys);
    },async (reason) => {
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


  showCategory(category) {
    if (this.shownCategory === category) {
      this.shownCategory = null;
    } else {
      this.shownCategory = category;
    }
  };

 

  goToProductByCategory( id) {
    this.router.navigateByUrl('product-by-category/'+ id);
  }


}
