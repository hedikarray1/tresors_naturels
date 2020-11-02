import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { WoocommerceService } from './../woocommerce.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private WoocommerceService:WoocommerceService,private http:HttpClient,private http1:HttpClient) { }


  getCategoryBySlug(slug:string){
    let myUrl=this.WoocommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products/categories",{"slug":slug});
   return this.http.get(myUrl);
  }

  getCategoriesWithProducts(){
    let options = {
      observe: "response" as "body",
      
    }
    let myUrl=this.WoocommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products/categories",options);
   return this.http.get(myUrl).pipe(
     map((res:any[])=>{

      let categories:any[];
      categories=res;
    
      for( let cat of categories){
        let myUrl1=this.WoocommerceService.authenticateApi('GET',environment.apiURL+"wc/v3/products",options);
      let a=  this.http1.get(myUrl1).pipe(map( (data:any[])=>{
          let prods:any[];
          console.log("in function");
          console.log("products",data);
          for(let p of data){
          
            let c:any[]=p.categories;
            if(c.find(e=>{e.id===cat.id})!=null){
              prods.push(p);
            }
            
          }

          return prods;
        }));
        a.subscribe((data:any[])=>{
          cat.products=data;
        });
      }
      return categories;
   })
   );
  }

}
