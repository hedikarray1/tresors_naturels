import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   
   
    
    let url1=environment.apiURL+"wc/v3/customers/"+user.id+"?"+this.WoocommerceService.authenticateApiForPost("POST",environment.apiURL+"wc/v3/customers/"+user.id+"",{});

    return this.http.post(url1,user);
  }
  


}
