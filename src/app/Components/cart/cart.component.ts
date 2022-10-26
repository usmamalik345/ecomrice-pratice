import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any;

  constructor(private userData: BooksService) {}

  ngOnInit(): void {
    this.userData.cart.subscribe((products: any) => {
      this.products = products;
    });
  }
}
