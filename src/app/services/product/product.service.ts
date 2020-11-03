import { WoocommerceService } from './../woocommerce.service';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  totalProducts = null;
  pages: any;

  constructor(private WooCommerceService:WoocommerceService,private http: HttpClient) { }


  

  getAllProductsWooCommerce(){
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products",{});
   return this.http.get(myUrl);
  }

  getproduct(id){
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products/"+id,{});
    return this.http.get(myUrl);
  }

  getProductsByCategory(category,page =1){
    let options = {
      observe: "response" as 'body'
    };
     let  params = {
      per_page: '5',
      page: ''+ page ,
      category : ''+ category
    };
    
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products",params);
   return this.http.get(myUrl,options).pipe(  map((res:any[])=>{
    this.pages = res['headers'].get('x-wp-totalpages');
    this.totalProducts = res['headers'].get('x-wp-total');
    let data = res['body'];
    return data ;
   })); 
  }



  
}
