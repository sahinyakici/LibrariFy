import { Injectable } from '@angular/core';
import { Book } from '../models/entityModels/book';
import { CartItems } from '../models/entityModels/cartItems';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../models/entityModels/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toastrService: ToastrService) {}

  addToCart(book: Book) {
    let item = CartItems.find((c) => c.book.bookId === book.bookId);
    if (item) {
      this.toastrService.error('Bu kitap zaten sepetinizde', 'Kitap mevcut!');
    } else {
      let cartItem = new CartItem();
      cartItem.book = book;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
      this.toastrService.success('Sepete eklendi!', book.bookName);
    }
  }

  getCartItems(): CartItem[] {
    return CartItems;
  }

  removeFromCart(book: Book) {
    let item: CartItem = CartItems.find((c) => c.book.bookId === book.bookId);
    CartItems.splice(CartItems.indexOf(item), 1);
    this.toastrService.warning('Kitap sepetten kaldırıldı',book.bookName);
  }
}
