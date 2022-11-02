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
  // public cartCount = new BehaviorSubject<number>(5);

  url: string = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.url);
  }

  addProductToCart(product: any) {
    let cartValues = this.cart.value;

    let exists = cartValues.find(
      (eachProduct: any) => eachProduct.id == product.id
    );

    if (exists) {
      exists.quantity++;
    } else {
      cartValues.push({ ...product, quantity: 1 });
    }
    this.cart.next(cartValues);
  }

  removeProductFromCart(index: any) {
    let cartValues = this.cart.value;
    this.cart.value.splice(index, 1);
    this.cart.next(cartValues);
  }

  EmptytheCart() {
    let clearCart = this.cart.value;
    clearCart = [];
    this.cart.next(clearCart);
  }
}
