import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this.productsService.cart.subscribe((products: any) => {
      this.products = products;
    });

    removeFromCart(product: any){
      this.productsService.removeProductFromCart(product)
    }
  }


}
