import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/books.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  count: number = 0;
  totals = 0;

  constructor(private ProductsService: ProductsService) {
    // this.ProductsService.addProductToCart()
    // this.ProductsService.cartCount.subscribe((res) => {
    //   this.count = res;
    // });
    // this.ProductsService.cartCount.next(this.count)
  }

  ngOnInit(): void {
    this.ProductsService.cart.subscribe((products) => {
      this.count = products.length;
      
    });
  }
}
