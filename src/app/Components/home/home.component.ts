import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/books.service';
import { SearchService } from 'src/app/service/search.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeProducts: any;
  rating = 0 
  starCount = 5 
  ratingArr: boolean[] = []
  selectedValue:  number = 0;
  searchText: string = '';
 
  



  constructor(private productService: ProductsService, private searchService: SearchService, ) {
    console.log('Home component loaded');

    // this.ratingArr = Array(this.countStar).fill(false)

  }
  

  ngOnInit(): void {
    this.getAllProducts();
    this.searchService.subject.subscribe(
      (search) => (this.searchText = search)
    );
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.homeProducts = data;
    });
  }

  addToCart(product: any) {
    this.productService.addProductToCart(product);
  }

   countStar(star : number) {
      this.selectedValue =  star;
      console.log('Value of star', star);
    }

}
