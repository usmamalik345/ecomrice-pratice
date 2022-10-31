import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any = [];

  isButtonVisible = true;

  constructor(private  ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this. ProductsService.cart.subscribe((products: any) => {
      this.products = products;
    });
  }

    removeFromCart(items: any){
        this.ProductsService.removeProductFromCart(items)
    }

    emptythewholearray(){
      this.ProductsService.EmptytheCart()
      this.isButtonVisible = false
    }
    
  }



