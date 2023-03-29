import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/books.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-deatail-card',
  templateUrl: './deatail-card.component.html',
  styleUrls: ['./deatail-card.component.css']
})
export class DeatailCardComponent implements OnInit {
  id: string | null | undefined;
   selectproduct: any
  constructor(private productService: ProductsService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['_id']
    this.getSelectedProduct()
    
  }
  getSelectedProduct( ) {
    this.productService.getSelectedProduct(this.id).subscribe((data: any) => {
     this.selectproduct = data
      console.log("🚀 ~ file: deatail-card.component.ts:24 ~ DeatailCardComponent ~ this.productService.getSelectedProduct ~ data:", data)
      
    });
  }
  addToCartselectproduct(){
    this.productService.addProductToCart(this.selectproduct)
  }
  
}
