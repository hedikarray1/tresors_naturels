import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private WoocommerceService: WoocommerceService) { }
  customer_key: string = 'ck_a32fb9ce427b528e361b6aa4069cbc14be7b4151';
  customer_secret: string = 'cs_ad6c7f6631489b1b186f69621cdafa4451129c75';

  getUsetByEmail() {

    let myUrl = this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/customers/" + "5", {});
    return this.http.get(myUrl);
  }

  updateUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = {
      first_name: "hedi",
      last_name: "karray"
    };
    
    const covertedData = "oauth_consumer_key=ck_a32fb9ce427b528e361b6aa4069cbc14be7b4151"

    return new Promise(resolve => {
      this.http.post(
          environment.apiURL + "wc/v3/customers/5?consumer_key=" + this.customer_key + "&consumer_secret=" + this.customer_secret,
          covertedData,
          { headers }
        )
        .subscribe(response => {
          resolve(response);
        });
    });
  }

}
