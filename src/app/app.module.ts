import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';
import { GenreComponent } from './components/genre/genre.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { UserbooksComponent } from './components/userbooks/userbooks.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NgxPaymentCardModule } from 'ngx-payment-card';
import { MyRentalsComponent } from './components/my-rentals/my-rentals.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BookComponent,
    AuthorComponent,
    GenreComponent,
    VatAddedPipe,
    FilterPipePipe,
    CartSummaryComponent,
    BookAddComponent,
    TruncatePipe,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    UserbooksComponent,
    EditBookComponent,
    PaymentComponent,
    MyRentalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaymentCardModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
