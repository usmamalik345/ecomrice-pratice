import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public subject = new BehaviorSubject<string>('');

  search(string: any) {
    this.subject.next(string);
    
    
  }


}
