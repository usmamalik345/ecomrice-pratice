import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';

import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './Components/login/login.component';
import { RegistorComponent } from './Components/registor/registor.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ReviewService } from './service/review.service';
import { DeatailCardComponent } from './Components/deatail-card/deatail-card.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,

    ContactComponent,
    HomeComponent,
    LoginComponent,
    RegistorComponent,
    DeatailCardComponent,
    SpinnerComponent,
    CheckoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule , Ng2SearchPipeModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  providers: [ { provide: FIREBASE_OPTIONS, useValue: environment.firebase } , ReviewService],
  bootstrap: [AppComponent],
})
export class AppModule {}
