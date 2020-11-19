import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private WoocommerceService: WoocommerceService) { }

  CreateOrder(
    billing: any,
    shipping: any,
    customer_id,
    coupon_lines :any[],
    customer_note: string,
    currency: string,
    shipping_lines: any[],
    line_items : any[]) {


    let params = {
      payment_method: "cod",
      payment_method_title: "Paiement à la livraison",
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

    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/orders/" + id, {}));

  }

  getMyOrders(id) {

    let params = { customer: id };
    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/orders", params));

  }

  getAllPaymentMethods(zone_id) {

    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/shipping/zones/" + zone_id + "/methods", {}));
  }

  getAllShippingZone() {

    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/shipping/zones", {}));
  }

  getCoupon(code) {

    let params = { code: code };

    return this.http.get(this.WoocommerceService.authenticateApi("GET", environment.apiURL + "wc/v3/coupons", params));

  }

}
