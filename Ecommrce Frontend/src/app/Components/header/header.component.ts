import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/service/books.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchfilter = '';
  homeProducts: any;
  products: any;
  count: any;
  constructor(
    private ProductsService: ProductsService,
    public searchService: SearchService
  ) {
    // this.ProductsService.addProductToCart()
    // this.ProductsService.cartCount.subscribe((res) => {
    //   this.count = res;
    // });
    // this.ProductsService.cartCount.next(this.count)
  }

  ngOnInit(): void {
    this.ProductsService.cart.subscribe((products) => {
      let count = 0;
      for (let i = 0; i < products.length; i++) {
        count += products[i].quantity;
      }
      this.count = count;
      this.products = products;
      console.log('Cart products:', products);
    });
  }
  search(event: any) {
    this.searchService.search(event?.target?.value);
  }
}
