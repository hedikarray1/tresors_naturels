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

  constructor(
    private loadingController : LoadingController,
    private router : Router,
    private categoryService : CategoryService,
    private modalCtrl: ModalController
    ) { }

    

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

 async getCategory(){
   
    this.categoryService.getParentCategory().subscribe((data: any[]) => {
     
      this.categorys = data;
      for (let cat of this.categorys) {
    
        this.categoryService.getSousCategory(cat.id).subscribe((data: any[]) => {
          cat.children = data ;
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

}
