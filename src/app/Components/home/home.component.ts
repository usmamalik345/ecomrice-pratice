import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/books.service';
import { ReviewService } from 'src/app/service/review.service';
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
 
  



  constructor(private productService: ProductsService, private searchService: SearchService, private review: ReviewService) {
    console.log('Home component loaded');

    this.ratingArr = Array(this.starCount).fill(false)

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

   countStar(i:any) {
    if(i)  {
    return "★"
    } else {
      return "☆"
    }
}
onClick(i: any, star:any){
  this.rating=0;
  i.filter((val:any)=>{
    if(val==true){
      this.rating=this.rating+1
    }

  })
  if(star){
    this.rating=+1  
    star = "★"
  }else{
    if (this.rating != 0 ) {
      this.rating=-1   
    }
   
  }
  this.review.reviewPorduct({productId:'1',rating:this.rating}).subscribe((res) =>{
    return res
  })
}

}
