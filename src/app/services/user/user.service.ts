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

  updateUser(user){
   
    let param = {
      first_name: "James",
      billing: {
        first_name: "James"
      },
      shipping: {
        first_name: "James"
      }
    }
    console.log(param);
    let myUrl= this.WoocommerceService.authenticateApi("GET",environment.apiURL+"wc/v2/customers/"+user.id+"",{});
    console.log(myUrl);
    return this.http.put(myUrl,param);
  }
  
}
