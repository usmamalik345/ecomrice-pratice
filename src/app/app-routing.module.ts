import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { DeatailCardComponent } from './Components/deatail-card/deatail-card.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistorComponent } from './Components/registor/registor.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},

  {path: 'contactus', component: ContactComponent},
  
  {path: 'home', component: HomeComponent, children: [
    {path: 'detailcard/:id', component: DeatailCardComponent}
   
  ]},

  {path: 'login', component: LoginComponent},

  {path: 'registor', component: RegistorComponent},
  
  {path: 'detailcard/:id', component: DeatailCardComponent},

  {path: 'checkout', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
