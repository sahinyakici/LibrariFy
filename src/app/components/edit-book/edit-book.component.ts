import { Book } from './../../models/entityModels/book';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage-service.service';
import { Author } from '../../models/entityModels/author';
import { Genre } from '../../models/entityModels/genre';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;
  editBookProgress: boolean = false;
  enterTheGenre: boolean = false;
  enterTheAuthor: boolean = false;
  pictureSelected: boolean = false;
  deletePopup: boolean = true;
  image: any = null;
  genres: Genre[] = [];
  authors: Author[] = [];
  book: Book = {
    authorName: '',
    bookId: '',
    bookName: '',
    genreName: '',
    imagePath: '',
    location: '',
    money: 0,
    ownerName: '',
    pageSize: 0,
    rentStatus: false,
    ownerUserName: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private genreService: GenreService,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.getAllGenres();
    this.getAllAuthors();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBookWithId(params['bookId']);
      this.createBookAddForm();
    });
  }

  createBookAddForm() {
    this.editBookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      money: [0],
      genreName: ['', Validators.required],
      authorName: ['', Validators.required],
      location: ['', Validators.required],
      pageSize: [0, Validators.required],
      imagePath: [''],
    });
  }

  authorSelectionControl(event: any) {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex === this.authors.length) {
      this.enterTheAuthor = true;
      this.editBookForm.controls['authorName'].setValue('');
    } else {
      this.enterTheAuthor = false;
    }
  }

  genreSelectionControl(event: any) {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex === this.genres.length) {
      this.enterTheGenre = true;
      this.editBookForm.controls['genreName'].setValue('');
    } else {
      this.enterTheGenre = false;
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (!file.type.startsWith('image')) {
        this.toastrService.error('Lütfen bir resim seciniz', 'HATA');
        this.editBookForm.get('imagePath').setValue(null);
        this.pictureSelected = false;
        return;
      }

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = file;
        this.pictureSelected = true;
      };
    }
  }

  pictureResetClassSelection() {
    if (this.pictureSelected) {
      return 'btn btn-danger';
    } else {
      return 'btn btn-danger disabled';
    }
  }

  resetPicture() {
    this.editBookForm.get('imagePath').setValue(null);
    this.pictureSelected = false;
    this.image = null;
  }

  saveBook() {
    let editedBook: Book = Object.assign({}, this.editBookForm.value);
    editedBook.bookId = this.book.bookId;
    editedBook.ownerName = this.localStorageService.getItem('userName');
    editedBook.ownerUserName=editedBook.ownerName
    this.bookService.editBook(editedBook).subscribe(
      (response) => {
        this.toastrService.info('Kitap güncellendi', 'Başarılı');
      },
      (error) => {
        this.toastrService.error(error.message);
      }
    );
  }
  getBookWithId(bookId: string) {
    this.bookService.getBooksById(bookId).subscribe((response) => {
      if (response.data) {
        this.book = Object.assign(response.data);
        this.transferData(this.book);
      } else {
        this.toastrService.error('Kitap bulunamadı', 'Hata');
      }
    });
  }

  getAllGenres() {
    this.genreService.getGenres().subscribe((response) => {
      response.data.forEach((element) => {
        if (element != undefined || element != null) {
          this.genres.push(element);
        }
      });
    });
  }

  getAllAuthors() {
    this.authorService.getAuthors().subscribe((response) => {
      response.data.forEach((element) => {
        this.authors.push(element);
      });
    });
  }

  transferData(bookData: Book) {
    this.editBookForm.patchValue({
      bookName: bookData.bookName,
      money: bookData.money,
      genreName: bookData.genreName,
      authorName: bookData.authorName,
      location: bookData.location,
      pageSize: bookData.pageSize,
      imagePath: '',
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

  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId).subscribe(
      (success) => {
        this.toastrService.success('Kitap silinidi', 'Başarılı');
        this.router.navigate(['/']);
        this.closePopUp();
      },
      (errorReponse) => {
        this.toastrService.error(errorReponse.message, errorReponse.name);
      }
    );
  }
}
