import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/entityModels/cartItem';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css',
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor() {}
  ngOnInit(): void {
  }
}
