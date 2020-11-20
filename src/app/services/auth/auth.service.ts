import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map , tap , switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(credentials) {
    return this.http.post(environment.apiURL + 'jwt-auth/v1/token', credentials).toPromise(); ;
  }
  logout(){

  }
  loadToken(){

  }
}
