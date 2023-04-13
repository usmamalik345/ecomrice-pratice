import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/books.service';
import { TotalAmoutService } from 'src/app/service/total-amout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any = [];
  count: number = 0;
  totalsss = 0;
  sum = 0;
  isButtonVisible = true;
  totals: any;
  shippingCost = 10;
  cartEmpty = false;
  constructor(
    private ProductsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ProductsService.cart.subscribe((products) => {
      this.count = products.length;
      this.products = products;
    });

    this.ProductsService.totals.subscribe((totals) => {
      this.totals = totals;
      
      console.log(totals);
    });
  }

  changeItemAmount(i: number, quantity: number) {}

  removeFromCart(items: any) {
    this.ProductsService.removeProductFromCart(items);
  }

  emptythewholearray() {
    this.ProductsService.EmptytheCart();
    this.isButtonVisible = false;
  }

  incrementItem(id: number, quantity: number) {
    this.ProductsService.changeItemAmount(id, quantity);
  }
}
