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
  cartEmpty = false
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
      (carry: number, item: any) => (carry += item.price * item.quantity ),
      0
    );
<<<<<<< HEAD

    this.totalwithshippingcast = this.totals + this.shippingCost
    

=======
        
>>>>>>> 2713e192ee3827eb22320fe01f685f0958a260f5
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
  }
}
