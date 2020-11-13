import { Storage } from '@ionic/storage';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { PopoverCardProductPage } from './../popovers/popover-card-product/popover-card-product.page';
import { PanierService } from './../../services/panier/panier.service';
import { StorageService } from './../../services/storage/storage.service';
import { CategoryService } from './../../services/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {
  allProducts: any[];
  products: any[];
  page = 1;
  count = null;
  searchText: string = "";
  userState: boolean = false;
  rep = /&amp;/gi;

  constructor(
    private poductService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private panierService: PanierService,
    private storageService: StorageService,
    private popoverController: PopoverController,
    private modalCtrl: ModalController,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });

    await this.getAllProductsPerPage();


  }


  async getAllProductsPerPage() {

    await this.poductService.getAllProductsWooCommercePerPage().subscribe((data: any[]) => {
      this.count = this.poductService.totalProducts;
      this.products = data;
      console.log("product per page :", this.products);
      console.log("page : " + this.page + "/" + this.poductService.pages);
      console.log("nbr all  product", this.count);
      this.getAllProducts();
    });
  }


  async getAllProducts() {

    this.poductService.getAllProductsWooCommerce(this.count).subscribe((data: any[]) => {

      this.allProducts = data;
      console.log("All product :", this.allProducts);
    });
  }

  loadMore(event) {
    this.page++;

    this.poductService.getAllProductsWooCommercePerPage(this.page).subscribe(res => {
      this.products = [...this.products, ...res];

      event.target.complete();
      console.log(" product page :", res);
      console.log("page : " + this.page + "/" + this.poductService.pages);
      // Disable infinite loading when maximum reached
      if (this.page == this.poductService.pages) {
        event.target.disabled = true;
      }
    });
  }

  goToDetail(id) {
    this.router.navigateByUrl('detail-produit/' + id);
  }

  addToCart(p) {
    console.log("adding to cart");
    let product = [
      {
        "product_id": p.id,
        "variation_id": 0,
        "quantity": 1
      }
    ]
    console.log("saving");
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.panierService.addToCartOnServer(product, val.id).subscribe((res: any[]) => {
          console.log("panier", res);

        })
      })
    } else {

      // this.storageService.saveCart(this.panier);
      //addProductToCartFromStorage(product) 
    }

  }

  async showPopover(event: MouseEvent, product) {
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
    //  this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: PanierModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }


}
