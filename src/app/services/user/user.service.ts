import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private WoocommerceService:WoocommerceService) { }


  getUsetByEmail(){
    
   let myUrl=this.WoocommerceService.authenticateApi("GET",environment.apiURL+"wc/v3/customers/"+"5",{});
   return this.http.get(myUrl);
  }

}
