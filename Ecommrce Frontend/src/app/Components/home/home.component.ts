import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/service/books.service';
import { ReviewService } from 'src/app/service/review.service';
import { SearchService } from 'src/app/service/search.service';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  pagination: any = {};
  homeProducts: any = [];
  rating = 0;
  starCount = 5;
  ratingArr: boolean[] = [];
  selectedValue: number = 0;
  searchText: string = '';
  filteredProducts$: Observable<any[]> | any;
  constructor(
    private productService: ProductsService,
    private searchService: SearchService,
    private review: ReviewService,
    private router: Router
  ) {
    console.log('Home component loaded');

    this.ratingArr = Array(this.starCount).fill(false);
  }

  ngOnInit(): void {
    // this.productService.dataSubject.subscribe((res) => {
    //   this.homeProducts = res;
    // });
    this.filteredProducts$ = this.productService.getFilteredProducts();
    
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data.products;
      this.pagination = data.pagination;
    });
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pagination.currentPage = page;
      this.productService.getAllProducts();
    }
  }
  addToCart(product: any) {
    this.productService.addProductToCart(product);
  }

  countStar(i: any) {
    if (i) {
      return '★';
    } else {
      return '☆';
    }
  }
  onClick(i: any, star: any) {
    this.rating = 0;
    i.filter((val: any) => {
      if (val == true) {
        this.rating = this.rating + 1;
      }
    });
    if (star) {
      this.rating = +1;
      star = '★';
    } else {
      if (this.rating != 0) {
        this.rating = -1;
      }
    }
    this.review
      .reviewPorduct({ productId: '1', rating: this.rating })
      .subscribe((res) => {
        return res;
      });
  }
}
