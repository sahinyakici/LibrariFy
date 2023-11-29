import { Book } from '../../models/book';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  constructor(private bookService: BookService) {}

  books: Book[] = [];
  message: string = '';
  success: boolean = false;
  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded=true;
    });
  }
}
