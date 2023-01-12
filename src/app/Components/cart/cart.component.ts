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
  shippingCost = 10
  totalwithshippingcast = 0
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
      this.totalwithshipping()
    });
  }

  public calcTotals() {
    console.log(123);
    this.totals = this.products.reduce(
      (carry: number, item: any) => (carry += item.price * item.quantity),
      0
    );
  }
  public totalwithshipping() {
    console.log(123);
    this.totalwithshippingcast = this.products.reduce(
      (carry: number, item: any) => (carry += item.price * item.quantity + this.shippingCost),
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
    item.quantity++;
    this.calcTotals();
   this.totalwithshipping();
  }
}
