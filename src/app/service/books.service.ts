import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
   
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  public cart = new BehaviorSubject<any>([]);
  public productList = new BehaviorSubject<any>([]);

  url: string = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10';

  constructor(private http: HttpClient) {}

  user() {
    return this.http.get(this.url).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
