import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private WoocommerceService: WoocommerceService) { }
  /*
  customer_key: string = 'ck_a32fb9ce427b528e361b6aa4069cbc14be7b4151';
  customer_secret: string = 'cs_ad6c7f6631489b1b186f69621cdafa4451129c75';
*/
  getUsetByEmail() {

    let myUrl = this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/customers/" + "5", {});
    return this.http.get(myUrl);
  }



  updateUser(user){
   
   
    
    let url1=environment.apiURL+"wc/v3/customers/"+user.id+"?"+this.WoocommerceService.authenticateApiForPost("POST",environment.apiURL+"wc/v3/customers/"+user.id+"",{});

    return this.http.post(url1,user);
  }
  
  createUser(user){
   
   
    
    let url1=environment.apiURL+"wc/v3/customers"+"?"+this.WoocommerceService.authenticateApiForPost("POST",environment.apiURL+"wc/v3/customers",{});

    return this.http.post(url1,user);
  }

}
