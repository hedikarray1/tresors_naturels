import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {
products:any[];
  constructor(private ProductService:ProductService) { }

  ngOnInit() {

    this.ProductService.getAllproducts().subscribe((data:any[])=>{
      console.log(data);
this.products=data;
    });
  }

}
