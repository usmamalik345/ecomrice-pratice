import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public cart = new BehaviorSubject<any>([]);
  public productList = new BehaviorSubject<any>([]);

  url: string = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.url);
  }

  addProductToCart(product: any) {
    let cartValues = this.cart.value;
    cartValues.push(product);
    this.cart.next(cartValues);
  }

  removeProductFromCart(){
      

  }


}
