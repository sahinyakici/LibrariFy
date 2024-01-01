import { CartItems } from './../models/entityModels/cartItems';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/entityModels/cartItem';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private filterTextSource = new BehaviorSubject<string>('');
  filterText$ = this.filterTextSource.asObservable();

  setFilterText(filterText: string) {
    this.filterTextSource.next(filterText);
  }

  allCartItems: CartItem[] = [];
  constructor() {}
}
