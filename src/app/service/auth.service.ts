import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        alert('something went right');
        localStorage.setItem('token', 'true');
        this.router.navigate(['/']);
      },
      (error) => {
        alert('something went Wrong');
        this.router.navigate(['/login']);
      }
    );
  }

  registor(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('registoration Suceess full');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('something went wrong');
       
      }
    );
  }
}
