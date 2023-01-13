import { Component, OnInit } from '@angular/core';
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

  constructor(
    private ProductsService: ProductsService,
    public searchService: SearchService,
    
  ) {
    // this.ProductsService.addProductToCart()
    // this.ProductsService.cartCount.subscribe((res) => {
    //   this.count = res;
    // });
    // this.ProductsService.cartCount.next(this.count)
  }

  ngOnInit(): void {}

  search(event: any) {
    this.searchService.search(event.target.value)
  }
 
}
