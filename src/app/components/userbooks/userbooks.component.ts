import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/entityModels/book';
import { BookService } from '../../services/book.service';
import { LocalStorageService } from '../../services/local-storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrl: './userbooks.component.css',
})
export class UserbooksComponent implements OnInit {
  dataLoaded: boolean = false;
  books: Book[] = [];
  constructor(
    private bookService: BookService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllUserBooks();
  }

  editBook(bookId: string) {
    this.router.navigate([`/edit/${bookId}`]);
  }

  getAllUserBooks() {
    const userName: string = this.localStorageService.getItem('userName');
    this.bookService.getAllBooksWithUserName(userName).subscribe((response) => {
      this.books = response.data;
      this.dataLoaded = true;
    });
  }
}
