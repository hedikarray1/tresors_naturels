import { CategoryService } from './../../services/category/category.service';
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

  productswoo: any[];

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private ProductService: ProductService,
    private CategoryService: CategoryService
  ) { }

  ngOnInit() {

    this.getAllProducts()

  }

  getCategoriesWithProducts() {
    this.CategoryService.getCategoriesWithProducts().subscribe((data: any[]) => {
      console.log("categories : ", data);
    });
  }

  getAllProducts() {
    this.ProductService.getAllProductsWooCommerce().subscribe((data1: any[]) => {
      console.log(data1);
      this.productswoo = data1;
    });
  }

  goToDetail(id) {
    this.router.navigateByUrl('detail-produit/' + id);
  }
}
