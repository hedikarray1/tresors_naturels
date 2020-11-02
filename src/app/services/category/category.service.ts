import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WoocommerceService } from './../woocommerce.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private WooCommerceService:WoocommerceService,private http: HttpClient) { }

  getAllCategory(){
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products/categories",{});
   return this.http.get(myUrl);
  }

  getParentCategory(){
    let params = {
      "parent" : 0
    }
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products/categories",params);
   return this.http.get(myUrl);
  }

  getSousCategory(id){
    let params = {
      "parent" : id
    }
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products/categories",params);
   return this.http.get(myUrl);
  }

  getCategory(id){
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products/categories/"+id,{});
   return this.http.get(myUrl);
  }

}
