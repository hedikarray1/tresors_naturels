import { CategoryService } from './../../services/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  allProducts: any[];
  products : any[];
  page = 1;
  count = null;
  searchText : string = "";

  constructor(
    private poductService : ProductService,
    private route: ActivatedRoute,
    private router : Router,
  ) { }

 async ngOnInit() {

   await this.getAllProductsPerPage();
   
   

  }

  
 async getAllProductsPerPage(){
   
await  this.poductService.getAllProductsWooCommercePerPage().subscribe((data: any[]) => {
    this.count = this.poductService.totalProducts;
    this.products = data;
     console.log("product per page :" , this.products);
     console.log("page : "+ this.page+"/"+ this.poductService.pages);
     console.log("nbr all  product" , this.count);
     this.getAllProducts();
  });
}


async getAllProducts(){
   
  this.poductService.getAllProductsWooCommerce(this.count).subscribe((data: any[]) => {
   
    this.allProducts = data;
    console.log("All product :" , this.allProducts);
  });
}

loadMore(event) {
  this.page++;

  this.poductService.getAllProductsWooCommercePerPage(this.page).subscribe(res => {
    this.products = [...this.products, ...res];

    event.target.complete();
    console.log(" product page :" , res);
    console.log("page : "+ this.page+"/"+ this.poductService.pages);
    // Disable infinite loading when maximum reached
    if (this.page == this.poductService.pages) {
      event.target.disabled = true;
    }
  });
}

goToDetail(id) {
  this.router.navigateByUrl('detail-produit/' + id);
}


}
