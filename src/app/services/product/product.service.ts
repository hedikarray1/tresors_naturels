import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  getAllproducts(){
    let options={
      observe: "response" as "body",
    params: new HttpParams().append("per_page","10")
    }
return this.http.get(environment.apiURL+"wp/v2/product"+"?_embed",options).pipe(
map(resp=>{
let data=resp["body"];
for(let produit of data){
produit.img_url=produit["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes["medium"].source_url;
}
return data;
})
);

  }
}
