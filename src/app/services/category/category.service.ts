import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { Injectable } from '@angular/core';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private WoocommerceService: WoocommerceService, private http: HttpClient, private http1: HttpClient) { }


  getCategoryBySlug(slug: string) {
    let myUrl = this.WoocommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products/categories", { "slug": slug });
    return this.http.get(myUrl).toPromise();
  }
  
  getAllCategory() {
    let myUrl = this.WoocommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products/categories", {});
    return this.http.get(myUrl).toPromise();
  }

  getParentCategory() {
    let params = {
      "parent": 0,
      "hide_empty": true,
      "exclude": ["168"],
      "order": "desc"
    }
    let myUrl = this.WoocommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products/categories", params);
    return this.http.get(myUrl).toPromise();
  }

  getSousCategory(id) {
    let params = {
      "parent": id
    }
    let myUrl = this.WoocommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products/categories", params);
    return this.http.get(myUrl).toPromise();
  }

  getCategory(id) {
    let myUrl = this.WoocommerceService.authenticateApi('GET', environment.apiURL + "wc/v3/products/categories/" + id, {});
    return this.http.get(myUrl).toPromise();
  }

  getCategoryHome(include) {
    let params = {
      "include": include
    }
    let myUrl = this.WoocommerceService.authenticateApiForPost('GET', environment.apiURL + "wc/v3/products/categories",params );
    return this.http.get(myUrl).toPromise();
  }

}
