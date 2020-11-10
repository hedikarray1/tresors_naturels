import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
current=true;
billing:any;
shipping:any;
  constructor(private OrderService:OrderService) { }

  ngOnInit() {
  }


  createOrder(){
if(this.current){
//for online users
//this.OrderService.CreateOrder()
}else{
// for visitors
}
  }


}
