import { Storage } from '@ionic/storage';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { PopoverCardProductPage } from './../popovers/popover-card-product/popover-card-product.page';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, AlertController } from '@ionic/angular';

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
  userState: boolean = false;

  constructor(
    private poductService : ProductService,
    private route: ActivatedRoute,
    private popoverController : PopoverController,
    private router : Router,
    private modalCtrl: ModalController,
    private storage: Storage,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
    });
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


async showPopoverPanier(event: MouseEvent,product) {
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
