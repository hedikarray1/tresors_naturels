import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { PanierService } from './../../services/panier/panier.service';
import { StorageService } from './../../services/storage/storage.service';
import { LoadingController } from '@ionic/angular';
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

  constructor(
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private ProductService: ProductService,
    private panierService: PanierService,
    private storageService: StorageService,
    private storage: Storage
  ) { }

  async ngOnInit() {

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });
    const loading = await this.loadingController.create();
    await loading.present();
    this.ProductService.getproduct(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
      console.log(data);
      this.product = data;
      this.setSegmentValue();
      if (this.product.type == "variable") {
        this.getVariation(this.product.variations);

      }
      this.datashow = true;
      this.getRelated(this.product.related_ids)
      loading.dismiss();
    });
  }

  async getVariation(variationsss) {
    console.log("variations");
    for (let v of variationsss) {
      await this.ProductService.getproduct(v).subscribe((data: any) => {
        console.log(data);
        let vv = {
          option: data?.attributes[0]?.option,
          id: v
        }
        this.variations.push(vv);
      });
    }
    console.log("variation table :", this.variations);
  }

  async getRelated(relatedss) {
    console.log("related product ");
    for (let r of relatedss) {
      await this.ProductService.getproduct(r).subscribe((data: any) => {
        console.log(data);

        this.relatedProducts.push(data);
      });
    }
    console.log("ralated product :", this.relatedProducts);
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
    this.itemQty += 1
  }

  removeItem() {
    if (this.itemQty > 1) {
      this.itemQty -= 1;
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
        this.panierService.addToCartOnServer(product, val.id).subscribe((res: any[]) => {
          console.log("panier", res);

        })
      })
    } else {

      // this.storageService.saveCart(this.panier);
      //addProductToCartFromStorage(product) 
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
        this.panierService.addToCartOnServer(product, val.id).subscribe((res: any[]) => {
          console.log("panier", res);

        })
      })
    } else {

      // this.storageService.saveCart(this.panier);
      //addProductToCartFromStorage(product) 
    }

  }

}
