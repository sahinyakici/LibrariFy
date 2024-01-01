import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { UserbooksComponent } from './components/userbooks/userbooks.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MyRentalsComponent } from './components/my-rentals/my-rentals.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BookComponent },
  { path: 'books', component: BookComponent },
  { path: 'books/:bookId', component: BookComponent },
  { path: 'genres/:genreId', component: BookComponent },
  { path: 'book/add', component: BookAddComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },
  { path: 'mybooks', component: UserbooksComponent, canActivate: [LoginGuard] },
  { path: 'edit/:bookId', component: EditBookComponent, canActivate: [LoginGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [LoginGuard] },
  { path: 'myrentals', component: MyRentalsComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
