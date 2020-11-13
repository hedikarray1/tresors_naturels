import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { PopoverCardProductPage } from './../popovers/popover-card-product/popover-card-product.page';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.page.html',
  styleUrls: ['./product-by-category.page.scss'],
})
export class ProductByCategoryPage implements OnInit {
  
  products : any[];
  category : any;
  idCategory : any;
  page = 1;
  count = null;
  rep = /&amp;/gi;

  constructor(
    private poductService : ProductService,
    private route: ActivatedRoute,
    private popoverController : PopoverController,
    private router : Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category') ;
    this.idCategory = this.route.snapshot.paramMap.get('id') ;
    this.getCategory()
  }

  
 async getCategory(){
   
  this.poductService.getProductsByCategory(this.idCategory).subscribe((data: any[]) => {
    this.count = this.poductService.totalProducts;
    this.products = data;
     console.log("category :" , this.products);
  });
}

loadMore(event) {
  this.page++;

  this.poductService.getProductsByCategory(this.idCategory,this.page).subscribe(res => {
    this.products = [...this.products, ...res];
    event.target.complete();

    // Disable infinite loading when maximum reached
    if (this.page == this.poductService.pages) {
      event.target.disabled = true;
    }
  });
}

goToDetail(id) {
  this.router.navigateByUrl('detail-produit/' + id);
}


async showPopover(event: MouseEvent,product) {
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

async openCart() {
 
 
  let modal = await this.modalCtrl.create({
    component: PanierModalPage,
    cssClass: 'cart-modal'
  });
  modal.onWillDismiss().then(() => {
  });
  modal.present();
}

}
