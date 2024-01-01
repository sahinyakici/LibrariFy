import { RentService } from './../../services/rent.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/entityModels/book';
import { LocalStorageService } from '../../services/local-storage-service.service';
import { ReturnRent } from '../../models/entityModels/rentReturned';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrl: './my-rentals.component.css',
})
export class MyRentalsComponent implements OnInit {
  dataLoaded: boolean = false;
  books: Book[] = [];
  rentModels: ReturnRent[] = [];
  constructor(
    private rentService: RentService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private bookService: BookService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getRentalsBook();
  }

  getRentalsBook() {
    const userName: string = this.localStorageService.getItem('userName');
    this.rentService.getRentalBookByUserName(userName).subscribe({
      next: (response) => {
        response.data.forEach((item) => {
          this.bookService.getBooksById(item.bookId).subscribe({
            next: (response) => {
              this.books.push(response.data);
            },
            error: (error) => {
              this.toastrService.error(response.message, 'HATA!');
            },
          });
        });
      },
      error: (error) => {
        this.toastrService.error('Kiralamalar getirilemedi!', 'HATA!');
      },
    });
    this.dataLoaded = true;
  }

  cancelRental(book: Book) {
    const userName: string = this.localStorageService.getItem('userName');
    this.rentService.getRentalBookByUserName(userName).subscribe({
      next: (response) => {
        response.data.forEach((item) => {
          if (item.bookId === book.bookId) {
            this.rentService.cancelRent(item.rentalId).subscribe({
              next: (response) => {
                this.toastrService.success('Kiralama silindi', 'Başarılı');
                this.closePopUp();
                this.router.navigate(['/']);
              },
            });
          }
        });
      },
    });
  }

  createPopUp() {
    const deletePopUp = document.getElementById('deleteModal');
    if (deletePopUp != null) {
      deletePopUp.style.display = 'block';
    }
  }

  closePopUp() {
    const deletePopUp = document.getElementById('deleteModal');
    if (deletePopUp != null) {
      deletePopUp.style.display = 'none';
    }
  }

  deleteRental(book: Book) {
    const userName: string = this.localStorageService.getItem('userName');
    this.rentService.getRentalBookByUserName(userName).subscribe({
      next: (response) => {
        response.data.forEach((item) => {
          if (item.bookId === book.bookId) {
            this.rentService.cancelRent(item.rentalId).subscribe({
              next: (response) => {
                this.toastrService.success('Kiralama silindi', 'Başarılı');
              },
            });
          }
        });
      },
    });
  }
}
