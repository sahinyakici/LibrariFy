import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/entityModels/book';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  books: Book[] = [];
  singleBook: Book;
  message: string = '';
  success: boolean = false;
  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['bookId']) {
        this.getBooksById(params['bookId']);
      } else {
        this.getBooks();
      }
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }

  getBooksById(bookId: string) {
    this.bookService.getBooksById(bookId).subscribe((response) => {
      this.books.push(response.data)
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }
}
