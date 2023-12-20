import { SharedService } from './../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/entityModels/book';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private toastrService: ToastrService
  ) {}

  books: Book[] = [];
  singleBook: Book;
  message: string = '';
  success: boolean = false;
  dataLoaded: boolean = false;
  filterText: string = '';

  ngOnInit(): void {
    this.sharedService.filterText$.subscribe((filterText) => {
      this.filterText = filterText;
    });
    this.activatedRoute.params.subscribe((params) => {
      if (params['bookId']) {
        this.getBooksById(params['bookId']);
      } else if (params['genreId']) {
        this.getBooksByGenre(params['genreId']);
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
      this.books.push(response.data);
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }

  getBooksByGenre(genreId: string) {
    this.dataLoaded = false;
    this.bookService.getBooksByGenre(genreId).subscribe((response) => {
      this.books = response.data;
      this.message = response.message;
      this.success = response.success;
      this.dataLoaded = true;
    });
  }

  addToCart(book: Book) {
    this.toastrService.success('Sepete eklendi!', book.bookName);
  }
}
