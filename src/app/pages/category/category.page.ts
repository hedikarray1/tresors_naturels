import { async } from '@angular/core/testing';
import { CategoryService } from './../../services/category/category.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MbscListviewOptions , mobiscroll} from '@mobiscroll/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categorys : any[];
  shownCategory : any;

  constructor(
    private loadingController : LoadingController,
    private router : Router,
    private categoryService : CategoryService
    ) { }

 async ngOnInit() {
   await this.getCategory();
 
  }

 async getCategory(){
   
    this.categoryService.getParentCategory().subscribe((data: any[]) => {
     
      this.categorys = data;
      for (let cat of this.categorys) {
        this.categoryService.getSousCategory(cat.id).subscribe((data: any[]) => {
          cat.children = data ;
         });
         
       }
        
 
       console.log("category :" , this.categorys);
    });
  }

  listviewSettings: MbscListviewOptions = {
    swipe: false,
    enhance: true
};



showCategory(category) {
  if (this.isCategoryShown(category)) {
    this.shownCategory = null;
  } else {
    this.shownCategory = category;
  }
};

isCategoryShown(category) {
  return this.shownCategory === category;
};

}
