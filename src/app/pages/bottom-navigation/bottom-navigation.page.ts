import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.page.html',
  styleUrls: ['./bottom-navigation.page.scss'],
})
export class BottomNavigationPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


gotToAccueil(){
this.router.navigate(["/bottom-navigation/all-products"]);
}
}
