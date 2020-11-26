import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { async } from '@angular/core/testing';
import { CategoryService } from './../../services/category/category.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MbscListviewOptions , mobiscroll} from '@mobiscroll/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categorys : any[];
  shownCategory : any;
   rep = /&amp;/gi;
loading;
  constructor(
    private loadingController : LoadingController,
    private router : Router,
    private categoryService : CategoryService,
    private modalCtrl: ModalController,
    private loadingCtrl:LoadingController
    ) { }

   async ionViewDidEnter() {
    this.loading =  this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/Spinner1.gif"  style="background: transparent !important;"/>`,
     
    });
    this.loading.then((load)=>{
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

 async getCategory(){
   
    this.categoryService.getParentCategory().then((data: any[]) => {
     
      this.categorys = data;
      for (let cat of this.categorys) {
    
        this.categoryService.getSousCategory(cat.id).then((data2: any[]) => {
        
        this.loading.then((load)=>{
load.dismiss();
        });
          cat.children = data2 ;
         });
         
       }
        
 
       console.log("category :" , this.categorys);
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

goToProductByCategory(category ,id){
  this.router.navigateByUrl('bottom-navigation/product-by-category/'+category+"/"+id);
}

async presentLoadingCustom() {
  let loading = await this.loadingController.create({
    spinner: null,
    cssClass: 'custom-loading',
    message: `<ion-img src="../../../assets/Spinner1.gif"  style="background: transparent !important;"/>`,
    duration: 5000,
  });
  loading.present();
}

}
