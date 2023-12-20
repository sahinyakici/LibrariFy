import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private filterTextSource = new BehaviorSubject<string>('');
  filterText$ = this.filterTextSource.asObservable();
  setFilterText(filterText: string) {
    this.filterTextSource.next(filterText);
  }
  constructor() {}
}
