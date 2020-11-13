import { Storage } from '@ionic/storage';
import { PanierService } from './../../../services/panier/panier.service';
import { StorageService } from './../../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-card-product',
  templateUrl: './popover-card-product.page.html',
  styleUrls: ['./popover-card-product.page.scss'],
})
export class PopoverCardProductPage implements OnInit {

  userState: boolean = false;
  itemQty  = 1 ;
  product : any ;
  id : any;
  constructor(
    private popoverController : PopoverController,
    private navParams: NavParams,
    private panierService: PanierService,
    private storageService: StorageService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.id = this.navParams.data.id;
    this.product = this.navParams.data.product;
    console.log("all data",this.navParams.data);
    console.log("product",this.product);
    console.log("id",this.id);

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val ;
    });
  
   
  }
   close(){
     this.popoverController.dismiss();
   }

   addToCart(p) {
    console.log("adding to cart");
    let product = [
      {
        "product_id": p.id,
        "variation_id" : 0 ,
        "quantity": this.itemQty
      }
    ]
    console.log("saving");
    if (this.userState) {
      
    this.storage.get('auth-user').then((val) => {
      console.log('auth-user', val);
      this.panierService.addToCartOnServer(product,val.id).subscribe((res: any[]) => {
        console.log("panier", res);

      })
    });
    } else {

      // this.storageService.saveCart(this.panier);
      //addProductToCartFromStorage(product) 
    }
    this.popoverController.dismiss();
  }


  
  addItem(){
    this.itemQty +=1
  }

  removeItem(){
   if (this.itemQty> 1){
     this.itemQty -= 1;
   }
  }
}
