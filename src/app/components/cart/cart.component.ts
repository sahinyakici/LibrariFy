import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/entityModels/book';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/entityModels/cartItem';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  books: Book[] = [];
  cartItems: CartItem[] = [];
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getAllBooksFromCart();
  }

  getAllBooksFromCart() {
    this.cartItems = this.cartService.getCartItems();
    this.sharedService.allCartItems = this.cartItems;
    this.cartItems.forEach((item) => {
      this.books.push(item.book);
      this.totalAmount += item.book.money;
    });
  }

  removeToCart(book: Book) {
    this.cartService.removeFromCart(book);
    let deleteBook: Book = this.books.find((b) => b.bookId === book.bookId);
    this.books.splice(this.books.indexOf(deleteBook), 1);
  }
}
