import { Injectable } from '@angular/core';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {
  nonce: string = ''
  currentTimestamp: number = 0 
  customer_key: string = 'ck_4a92bcb1b1713654e98d65328b3b6216c000f08c'; 
  customer_secret: string = 'cs_07aa20773656d90725cdf9860d347e84d4180fc7';  
  constructor() { }

  authenticateApi(method,url,params) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    this.nonce ='';
    for(var i = 0; i < 6; i++) {
        this.nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }    
    this.currentTimestamp = Math.floor(new Date().getTime() / 1000);

    let authParam:object ={
        oauth_consumer_key : this.customer_key,
        oauth_nonce : this.nonce,
        oauth_signature_method : 'HMAC-SHA1',
        oauth_timestamp : this.currentTimestamp,
        oauth_version : '1.0',
    } 
    let parameters = Object.assign({}, authParam, params);
    let signatureStr:string = '';
    Object.keys(parameters).sort().forEach(function(key) {
        if(signatureStr == '')
            signatureStr += key+'='+parameters[key];
        else
            signatureStr += '&'+key+'='+parameters[key];
    });
    let paramStr:string = '';
    Object.keys(params).sort().forEach(function(key) {

        paramStr += '&'+key+'='+parameters[key];
    });
    return url+'?oauth_consumer_key='+this.customer_key+'&oauth_nonce='+this.nonce+'&oauth_signature_method=HMAC-SHA1&oauth_timestamp='+this.currentTimestamp+'&oauth_version=1.0&oauth_signature='+Base64.stringify(hmacSHA1(method+'&'+encodeURIComponent(url)+'&'+encodeURIComponent(signatureStr),this.customer_secret+'&'))+paramStr;

  }


  authenticateApiForPost(method,url,params) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    this.nonce ='';
    for(var i = 0; i < 6; i++) {
        this.nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }    
    this.currentTimestamp = Math.floor(new Date().getTime() / 1000);

    let authParam:object ={
        oauth_consumer_key : this.customer_key,
        oauth_nonce : this.nonce,
        oauth_signature_method : 'HMAC-SHA1',
        oauth_timestamp : this.currentTimestamp,
        oauth_version : '1.0',
    } 
    let parameters = Object.assign({}, authParam, params);
    let signatureStr:string = '';
    Object.keys(parameters).sort().forEach(function(key) {
        if(signatureStr == '')
            signatureStr += key+'='+parameters[key];
        else
            signatureStr += '&'+key+'='+parameters[key];
    });
    let paramStr:string = '';
    Object.keys(params).sort().forEach(function(key) {

        paramStr += '&'+key+'='+parameters[key];
    });
    return 'oauth_consumer_key='+this.customer_key+'&oauth_nonce='+this.nonce+'&oauth_signature_method=HMAC-SHA1&oauth_timestamp='+this.currentTimestamp+'&oauth_version=1.0&oauth_signature='+Base64.stringify(hmacSHA1(method+'&'+encodeURIComponent(url)+'&'+encodeURIComponent(signatureStr),this.customer_secret+'&'))+paramStr;

  }

}
