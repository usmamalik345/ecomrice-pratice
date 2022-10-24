import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
 url: string = 'https://api.escuelajs.co/api/v1/products';
 
  constructor(private http: HttpClient) {}

  user() {
    return this.http.get(this.url);
  }
}
