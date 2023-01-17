import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/books.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totals: { withShipping: number; withoutShipping: number; }={ withShipping: 0, withoutShipping: 0, };

  constructor(private ProductsService: ProductsService) {}

  ngOnInit(): void {
    
    this.ProductsService.totals.subscribe((totals) => {
      this.totals = totals;
    });
  }
}
