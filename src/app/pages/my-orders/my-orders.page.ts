import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { OrderService } from './../../services/order/order.service';
import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  panier: any[]=[];
  userState: boolean = false;
billing:any;
shipping:any;
current_user:any;
payment_methodes:any[];
orders:any[]=[];
status={"pending":{title:"en attente",color:"warning"},
 "processing":{title:"en cours",color:"secondary"},
  "on-hold":{title:"en attente",color:"warning"},
   "completed":{title:"Terminé",color:"success"}, 
   "cancelled":{title:"Annulé",color:"danger"},
    "refunded":{title:"Remboursé",color:"tertiary"},
     "failed":{title:"échec",color:"danger"} ,
     "trash":{title:"En corbeille",color:"danger"}}
  constructor(private router:Router,private StorageService:StorageService,private OrderService:OrderService,private UserService:UserService) { }

  ngOnInit() {
    this.userState=this.StorageService.getUserState();
    this.getUserdata();
  }
  
async getUserdata(){
  if(this.userState){
    //for online users
    this.UserService.getUserById(this.StorageService.getUser().id).subscribe((data:any)=>{
    this.billing=data.billing;
    this.shipping=data.shipping;
    console.log("is online",data);
    this.current_user=data;
    this.getOrders();


    });
  }else{
    console.log("is not online");

    this.current_user={id:0};
  }

}

getOrders(){
  this.OrderService.getMyOrders(this.current_user.id).subscribe((data:any[])=>{
this.orders=data;
  });
}


toDetails(id){
  this.router.navigate(["my-order-details/"+id])
}
}
