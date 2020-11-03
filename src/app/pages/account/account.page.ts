import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private UserService:UserService) { }
 User:any;
  ngOnInit() {
    this.UserService.getUsetByEmail().subscribe((data:any)=>{
this.User=data;
    });
  }

}
