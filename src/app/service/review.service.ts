import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient ) { }
  reviewPorduct(ratingArr: any){
    return this.http.post('https://storeproject-e5a65-default-rtdb.asia-southeast1.firebasedatabase.app/Review.json' ,ratingArr)


    
  }
}
