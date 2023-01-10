import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  private count = 0 
  private spinnerss = new BehaviorSubject<string>('')
  constructor() { }

getSpinnerOberver(): Observable<string>{
  return this.spinnerss.asObservable()
}

  requestStart(){
    if (++this.count === 1) {
      this.spinnerss.next('start')
    }
    }

    requestEnded(){
      if (this.count === 0 || --this.count === 0) {
        this.spinnerss.next('end')
      }
    }
}
