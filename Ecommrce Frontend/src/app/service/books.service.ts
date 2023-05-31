import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private search = '';
  allProducts: any = [];
  shippingCost = 10;
  public cart = new BehaviorSubject<any>([]);
  public totals = new BehaviorSubject<{
    withShipping: number;
    withoutShipping: number;
  }>({ withShipping: 0, withoutShipping: 0 });
  public productList = new BehaviorSubject<any>([]);
  // public cartCount = new BehaviorSubject<number>(5);

  url: string = 'http://localhost:3000/products';

  public dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public data$: Observable<any[]> = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  getAllProducts() {
    return this.http.get<any[]>(this.url).pipe(
      tap((data) => {
        this.allProducts = data;
        console.log("🚀 ~ file: books.service.ts:37 ~ ProductsService ~ tap ~ data:", data)
        
        this.dataSubject.next(data);
        console.log("🚀 ~ file: books.service.ts:39 ~ ProductsService ~ tap ~ this.dataSubject.next(data);:", this.dataSubject.next(data))
      })
    );
  }

  searchProduct(search: string) {
    if (!search) {
      this.dataSubject.next(this.allProducts);
    }

    const filteredProducts = this.allProducts.filter(
      (product: { title: string; description: string }) =>
        (product.title && product.title.toLowerCase().includes(search)) ||
        (product.description &&
          product.description.toLowerCase().includes(search))
    );

    this.dataSubject.next(filteredProducts);
  }

  getSelectedProduct(id: any) {
    return this.http.get(this.url + '/' + id);
  }

  addProductToCart(product: any) {
    let cartValues = this.cart.value;

    let exists = cartValues.find(
      (eachProduct: any) => eachProduct._id == product._id
    );

    if (exists) {
      exists.quantity++;
    } else {
      cartValues.push({ ...product, quantity: 1 });
    }
    this.cart.next(cartValues);
    this.calcTotals();
  }

  getCartCount() {
    return this.cart.asObservable();
  }

  removeProductFromCart(index: any) {
    let cartValues = this.cart.value;
    this.cart.value.splice(index, 1);
    this.cart.next(cartValues);
    this.calcTotals();
  }

  EmptytheCart() {
    this.cart.next([]);
  }

  public calcTotals() {
    const totals = Math.round(
      this.cart.value.reduce(
        (carry: number, item: any) => (carry += item.price * item.quantity),
        0
      )
    );

    const totalwithshippingcast = Math.round(totals + this.shippingCost);

    this.totals.next({
      withShipping: totalwithshippingcast,
      withoutShipping: Math.round(totals),
    });
  }

  changeItemAmount(id: number, quantity: number) {
    let cartValues = this.cart.value;

    let exists = cartValues.find((eachProduct: any) => eachProduct.id == id);

    if (exists) {
      exists.quantity = quantity;
    }

    this.cart.next(cartValues);
    this.calcTotals();
  }
}
