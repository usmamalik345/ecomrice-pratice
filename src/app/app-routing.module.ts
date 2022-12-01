import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistorComponent } from './Components/registor/registor.component';

const routes: Routes = [
  {path: 'cart', component: CartComponent,},

  {path: 'contactus', component: ContactComponent,},
  
  {path: '', component: HomeComponent},

  {path: 'login', component: LoginComponent,},

  {path: 'registor', component: RegistorComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
