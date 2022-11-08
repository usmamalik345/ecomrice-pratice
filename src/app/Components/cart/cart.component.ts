import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any = [];
  count: number = 0;
  totalss = 0;
  sum = 0;
  isButtonVisible = true;
  totals = 0;

  constructor(private ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.ProductsService.cart.subscribe((products) => {
      this.count = products.length;
    });
    this.getCartProducts();
  }

  getCartProducts() {
    this.ProductsService.cart.subscribe((products: any) => {
      this.products = products;
      this.calcTotals();
    });
  }

  public calcTotals() {
    console.log(123);
    this.totals = this.products.reduce(
      (carry: number, item: any) => (carry += item.price * item.quantity),
      0
    );
  }

  removeFromCart(items: any) {
    this.ProductsService.removeProductFromCart(items);
  }

  emptythewholearray() {
    this.ProductsService.EmptytheCart();
    this.isButtonVisible = false;
  }

  incrementItem(item: any) {
    // this.sum = this.totals + (this.products *   )
    if (item.quantity < 0) {
     item.quantity = 0
    }else {
      item.quantity++;
      this.calcTotals();
    }
    
  }
}
