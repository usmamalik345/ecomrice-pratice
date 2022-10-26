import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeProducts: any;
  currentCart: any;

  constructor(private userData: BooksService) {}

  ngOnInit(): void {
    this.userData.user().subscribe((data: any) => {
      this.homeProducts = data;
    });
    this.userData.cart.subscribe((cartData) => {
      this.currentCart = cartData;
    });
  }
  addToCart(product: any) {
    this.currentCart.push(product);
    this.userData.cart.next(this.currentCart);
  }
}
