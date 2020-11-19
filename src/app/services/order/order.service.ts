import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  totalcoupon = null;

  constructor(private http: HttpClient, private WoocommerceService: WoocommerceService) { }

  CreateOrder(billing: any,
    shipping: any,
    customer_id,
    coupon_lines,
    payment_method_id: string,
    payment_method_title: string,
    customer_note: string,
    currency: string,
    shipping_lines: any[],
    line_items) {


    let params = {
      billing: billing,
      shipping: shipping,
      customer_id: customer_id,
      coupon_lines: coupon_lines,
      customer_note: customer_note,
      currency: currency,
      status: "processing",
      shipping_lines:shipping_lines,
      line_items: line_items
    };
    let url = environment.apiURL + "wc/v3/orders?" + this.WoocommerceService.authenticateApiForPost("POST", environment.apiURL + "wc/v3/orders", {});
    return this.http.post(url, params);
  }


  getMyOrderDetails(id) {

    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/orders/" + id, {}), {});

  }

  getMyOrders(id) {

    let params = { customer: id };
    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/orders", params), {});

  }

  getAllPaymentMethods() {

    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/shipping_methods", {}), {});
  }

  generateCoupon(code, amount, userid) {
    let params = {
      "code": code,
      "amount": amount,

      "individual_use": true,
      "date_expires": "2021-11-17T00:00:00",
      "date_expires_gmt": "2021-11-16T23:00:00",
      "usage_limit": 1,
      "usage_limit_per_user": null,
      "limit_usage_to_x_items": null,
      "free_shipping": false,
      "exclude_sale_items": false,
      "meta_data": [
        {
          "key": "_acfw_excluded_coupons",
          "value": []
      },
      {
          "key": "_acfw_schedule_start",
          "value": ""
      },
      {
          "key": "_acfw_schedule_end",
          "value": ""
      },
      {
          "key": "_acfw_schedule_start_error_msg",
          "value": ""
      },
      {
          "key": "_acfw_schedule_expire_error_msg",
          "value": ""
      },
      {
          "key": "_acfw_reset_usage_limit_period",
          "value": "none"
      },
      {
          "key": "_acfw_disable_url_coupon",
          "value": ""
      },
      {
          "key": "_acfw_code_url_override",
          "value": ""
      },
      {
          "key": "_acfw_success_message",
          "value": ""
      },
      {
          "key": "_acfw_after_redirect_url",
          "value": ""
      },
      {
          "key": "_acfw_enable_role_restriction",
          "value": ""
      },
      {
          "key": "_acfw_usage_limit_reset_time",
          "value": ""
      },
        {
          "key": "_acfw_loyalty_program_user",
          "value": userid
        },
        {

          "key": "_acfw_loyalty_program_points",
          "value": amount
        }]
    }
    let url = environment.apiURL + "wc/v3/coupons?" + this.WoocommerceService.authenticateApiForPost("POST", environment.apiURL + "wc/v3/coupons", {});
    return this.http.post(url, params);
  }

  getCountMyCoupons(){
    let options = {
      observe: "response" as 'body'
    };

    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/coupons", {}), options).pipe(  map((res:any[])=>{
     
      this.totalcoupon = res['headers'].get('x-wp-total');
      let data = res['body'];
      return data ;
    }));
  }

  
  getAllMyCoupons(nbr){
    let options = {
      observe: "response" as 'body'
    };
    let  params = {
      per_page: nbr
    };
    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/coupons", params), options).pipe(  map((res:any[])=>{
     
      this.totalcoupon = res['headers'].get('x-wp-total');
      let data = res['body'];
      return data ;
    }));
  }

}

