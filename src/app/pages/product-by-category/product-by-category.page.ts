import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.page.html',
  styleUrls: ['./product-by-category.page.scss'],
})
export class ProductByCategoryPage implements OnInit {
  
  products : any[];
  category : any;
  constructor(
    private poductService : ProductService,
    private route: ActivatedRoute,
    private router : Router,
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category') ;
    this.getCategory(this.route.snapshot.paramMap.get('id'))
  }

  
 async getCategory(category){
   
  this.poductService.getProductsByCategory(category).subscribe((data: any[]) => {
   
    this.products = data;
     console.log("category :" , this.products);
  });
}

}
