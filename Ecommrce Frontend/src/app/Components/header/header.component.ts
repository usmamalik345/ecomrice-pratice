import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/service/books.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchfilter = '';
  filteredProducts: any[] | any;
  homeProducts: any;
  products: any;
  count: any;
  productss: any[] | any;
  subscription: Subscription | any;
  private apiUrl = 'http://localhost:3000/products';
  searchText: any;
  constructor(
    private ProductsService: ProductsService,
    public searchService: SearchService,
    private http: HttpClient
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

  search() {
    this.ProductsService.searchProducts(this.searchfilter);
  }

  // filterProducts(): void {
  //   let text = (this.searchText || '').toLowerCase().trim();
  //   this.ProductsService.searchProduct(text);
  // }
}
