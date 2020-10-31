import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {
  products: any[];
  constructor(
    private loadingController : LoadingController,
    private router : Router,
    private ProductService: ProductService
    ) { }

 async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.ProductService.getAllproducts().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
       loading.dismiss();
    });
  }

  goToDetail(id){
    this.router.navigateByUrl('detail-produit/'+id);
  }
}
