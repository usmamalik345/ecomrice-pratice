import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: any;

  constructor(private userData: BooksService) {}

  ngOnInit(): void {
    this.userData.user().subscribe((data : any) => {
      this.books = data.docs;
      
    });
  }
}
