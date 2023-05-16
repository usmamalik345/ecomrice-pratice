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
  searchQuery: any;
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
    this.getPublishedProducts(true);
  }

  getProducts(published: boolean) {
    const params = new HttpParams().set('published', String(published));
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  getPublishedProducts(published: boolean) {
    this.getProducts(published).subscribe({
      next: (response: any[]) => {
        this.products = response;
        this.filteredProducts = []// Initialize filteredProducts with all products
        console.log("🚀 ~ file: header.component.ts:56 ~ HeaderComponent ~ this.getProducts ~ this.products;:", this.products)
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
  filterProducts() {
    if (this.products) {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase().trim();
        this.filteredProducts = this.products.filter((product: { name: string; description: string; }) =>
          (product.name && product.name.toLowerCase().includes(query)) ||
          (product.description && product.description.toLowerCase().includes(query))
        );
        console.log("🚀 ~ file: header.component.ts:71 ~ HeaderComponent ~ filterProducts ~ this.filteredProducts:", this.filteredProducts)
      } else {
        this.filteredProducts = [] // Show all products when search query is empty
        
      }
    }
  }
}
