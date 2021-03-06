import { WoocommerceService } from './../woocommerce.service';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  totalProducts = null;
  pages: any;

  constructor(private WooCommerceService: WoocommerceService, private http: HttpClient) { }




  getAllProductsWooCommercePerPage(page = 1) {
    let options = {
      observe: "response" as 'body'
    };

    let params = {
      per_page: '6',
      page: '' + page
    };
    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products", params);
    return this.http.get(myUrl, options).pipe(map((res: any[]) => {
      this.pages = res['headers'].get('x-wp-totalpages');
      this.totalProducts = res['headers'].get('x-wp-total');
      let data = res['body'];
      return data;
    })).toPromise();
  }

  getAllProductsWooCommerce(count) {


    let options = {
      observe: "response" as 'body'
    };

    let params = {
      per_page: "" + count
    };

    console.log("params recherche", params);

    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products", params);
    return this.http.get(myUrl, options).pipe(map((res: any[]) => {
      this.pages = res['headers'].get('x-wp-totalpages');
      this.totalProducts = res['headers'].get('x-wp-total');
      let data = res['body'];
      return data;
    })).toPromise();
  }

  getAllProductsWooCommerce2(page = 1) {


    let options = {
      observe: "response" as 'body'
    };

    let params = {
      per_page: '100',
      page: '' + page
    };

    console.log("params recherche", params);

    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products", params);
    return this.http.get(myUrl, options).pipe(map((res: any[]) => {
      this.pages = res['headers'].get('x-wp-totalpages');
      this.totalProducts = res['headers'].get('x-wp-total');
      let data = res['body'];
      return data;
    })).toPromise();
  }

  getproduct(id) {
    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products/" + id, {});
    return this.http.get(myUrl).toPromise();
  }

  getProductsByCategory(category, page = 1) {
    let options = {
      observe: "response" as 'body'
    };

    let params = {
      per_page: '6',
      page: '' + page,
      category: '' + category
    };

    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products", params);
    return this.http.get(myUrl, options).pipe(map((res: any[]) => {
      this.pages = res['headers'].get('x-wp-totalpages');
      this.totalProducts = res['headers'].get('x-wp-total');
      let data = res['body'];
      return data;
    }));
  }


  getHomeProductsByCategory(category) {
    let options = {
      observe: "response" as 'body'
    };

    let params = {
      
      category: '' + category
    };

    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products", params);
    return this.http.get(myUrl, options).toPromise();

  }

  getHomeCoffretProductsByCategory(category) {
    let options = {
      observe: "response" as 'body'
    };

    let params = {
      category :category,
      exclude:4050
    };

    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products", params);
    return this.http.get(myUrl, options);

  }


  getProductsWithPrams(params) {
    let options = {
      observe: "response" as 'body'
    };

    let myUrl = this.WooCommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products", params);
    return this.http.get(myUrl, options).toPromise();

  }

  // custom product api

  getAllproductCustom() {
    return this.http.get(environment.apiCustomURL+"product/all_products.php").toPromise();
  }

  getProductCustom(id) {
    let params ={
      "id" : id
    }
    return this.http.post(environment.apiCustomURL+"product/product_details.php",params).toPromise();
  }

  getProductByCategoryCustom(id) {
    let params ={
      "id" : id
    }
    return this.http.post(environment.apiCustomURL+"product/products_by_category.php",params).toPromise();
  }
}
