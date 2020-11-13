import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient,private WoocommerceService:WoocommerceService) { }

  CreateOrder(billing:any,
    shipping:any,
    customer_id,
    coupon_lines,
    payment_method_id:string,
    payment_method_title:string,
    customer_note:string,
    currency:string,
    shipping_lines:any[],
    line_items	){


      let params={billing:billing,
        shipping:shipping,
        customer_id:customer_id,
        coupon_lines:coupon_lines,
        payment_method_id:payment_method_id,
        payment_method_title:payment_method_title,
        customer_note:customer_note,
        currency:currency,
        status:"processing",
      //  shipping_lines:shipping_lines,
        line_items:line_items
      };
      let url=environment.apiURL+"wc/v3/orders?"+this.WoocommerceService.authenticateApiForPost("POST",environment.apiURL+"wc/v3/orders",{});
return this.http.post(url,params);
  }


getMyOrderDetails(id){

  return this.http.get(this.WoocommerceService.authenticateApi("GET",environment.apiURL+"wc/v3/orders/"+id,{}),{});

}

getMyOrders(id){

  let params={customer:id};
  return this.http.get(this.WoocommerceService.authenticateApi("GET",environment.apiURL+"wc/v3/orders",params),{});

}

  getAllPaymentMethods(){
    
   return this.http.get(this.WoocommerceService.authenticateApi("GET",environment.apiURL+"wc/v3/shipping_methods",{}),{});
  }
}
