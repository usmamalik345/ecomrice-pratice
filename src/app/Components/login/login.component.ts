import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
constructor(private auth: AuthService ) { }
 
email: string = ''
password: string = ''


  ngOnInit(): void {
  }
     
   login(){
    if (this.email == '') {
       alert('please enter Email ')
       return
    }
    if (this.password == '') {
      alert('please enter Password ')
      return
   }
   
   this.auth.login(this.email , this.password)
   this.email = ''
   this.password= ''
   }



}
