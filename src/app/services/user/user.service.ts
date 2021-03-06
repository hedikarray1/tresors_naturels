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
  getUserById(id) {

    let myUrl = this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/customers/" + id, {});
    return this.http.get(myUrl).toPromise(); 
  }

  getUserByIdCustom(id) {

    let params ={
      "id" : id
    }
    return this.http.post(environment.apiCustomURL+"user/current_user.php",params).toPromise();
  }


  updateUser(user){
   
   
    
    let url1=environment.apiURL+"wc/v3/customers/"+user.id+"?"+this.WoocommerceService.authenticateApiForPost("POST",environment.apiURL+"wc/v3/customers/"+user.id+"",{});

    return this.http.post(url1,user).toPromise(); 
  }
  
  createUser(user){
   
   
    
    let url1=environment.apiURL+"wc/v3/customers"+"?"+this.WoocommerceService.authenticateApiForPost("POST",environment.apiURL+"wc/v3/customers",{});

    return this.http.post(url1,user).toPromise(); 
  }


  checkFirstTime(email){
    let params={
      email:email
    };
    return this.http.post(environment.apiCustomURL+"mobile_users/check_first_time.php",params).toPromise();
  }
  addFirstTime(email){
    let params={
      email:email
    }
  return   this.http.post(environment.apiCustomURL+"mobile_users/set_first_time.php",params).toPromise();
  }

 insertLoyalityProgram(user_id,entry_type,entry_action,entry_amount){
   let params={
    user_id: user_id,
    entry_type:entry_type,
    entry_action:entry_action,
    entry_amount:entry_amount,
    
 };
  return this.http.post(environment.apiCustomURL+"user/insert_loyality_program.php",params).toPromise();
 }

 getPointsLoyalityProgram(user_id){
  let params={
   id: user_id
    };
 return this.http.post(environment.apiCustomURL+"user/get_user_points.php",params).toPromise();
}


}
