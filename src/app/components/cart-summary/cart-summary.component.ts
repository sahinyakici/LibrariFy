import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/entityModels/cartItem';
import { CartService } from '../../services/cart.service';
import { Book } from '../../models/entityModels/book';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css',
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(book: Book) {
    this.cartService.removeFromCart(book);
  }
}
