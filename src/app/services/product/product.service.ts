import { WoocommerceService } from './../woocommerce.service';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private WooCommerceService:WoocommerceService,private http: HttpClient) { }


  getAllproducts() {
    let options = {
      observe: "response" as "body",
      params: new HttpParams().append("per_page", "95")
    }
    return this.http.get(environment.apiURL + "wp/v2/product" + "?_embed", options).pipe(
      map(resp => {
        let data = resp["body"];
        for (let produit of data) {
          produit.img_url = produit["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes["medium_large"].source_url;
        }
        return data;
      })
    );

  }

  getAllProductsWooCommerce(){
    let myUrl=this.WooCommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products",{});
   return this.http.get(myUrl);
  }

  getproduct(id) {
   
    return this.http.get(environment.apiURL + "wp/v2/product/"+id + "?_embed").pipe(
      map(resp => {
        
          resp['img_url'] = resp["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes["medium_large"].source_url;
        
        return resp;
       
      })
    );

  }
}
