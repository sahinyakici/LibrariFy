import { AuthorService } from './../../services/author.service';
import { GenreService } from './../../services/genre.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Genre } from '../../models/entityModels/genre';
import { Author } from '../../models/entityModels/author';
import { Book } from '../../models/entityModels/book';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage-service.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css',
})
export class BookAddComponent implements OnInit {
  bookAddForm: FormGroup;
  genres: Genre[] = [];
  authors: Author[] = [];
  enterTheGenre: boolean = false;
  enterTheAuthor: boolean = false;
  image: any = null;
  bookAddProgres: boolean = false;
  pictureSelected: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private authorService: AuthorService,
    private bookService: BookService,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService
  ) {}
  ngOnInit(): void {
    this.getAllGenres();
    this.getAllAuthors();
    this.createBookAddForm();
  }

  createBookAddForm() {
    this.bookAddForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      money: [0],
      genreName: ['', Validators.required],
      authorName: ['', Validators.required],
      location: ['', Validators.required],
      pageSize: ['', Validators.required],
      imagePath: [null],
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

  addBook() {
    if (this.bookAddForm.valid) {
      let bookModel: Book = Object.assign({}, this.bookAddForm.value);
      bookModel.ownerName = this.localStorageService.getItem('userName');
      bookModel.ownerUserName = bookModel.ownerName;
      this.bookAddProgres = true;
      this.bookService.addBook(bookModel, this.image).subscribe(
        (data) => {
          this.bookAddProgres = false;
          this.toastrService.success(data.message, 'Başarılı');
          this.clearAllField();
        },
        (responseError) => {
          this.bookAddProgres = false;
          if (responseError.error.Errors.length > 0) {
            for (
              let index = 0;
              index < responseError.error.Errors.length;
              index++
            ) {
              const element = responseError.error.Errors[index];
              this.toastrService.error(
                element.ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error(
        'Tüm alanları doğru bir şekilde doldurunuz!',
        'Kitap eklenemedi'
      );
    }
  }

  authorSelectionControl(event: any) {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex === this.authors.length) {
      this.enterTheAuthor = true;
      this.bookAddForm.controls['authorName'].setValue('');
    } else {
      this.enterTheAuthor = false;
    }
  }

  genreSelectionControl(event: any) {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex === this.genres.length) {
      this.enterTheGenre = true;
      this.bookAddForm.controls['genreName'].setValue('');
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
        this.bookAddForm.get('imagePath').setValue(null);
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
    this.bookAddForm.get('imagePath').setValue(null);
    this.pictureSelected = false;
    this.image = null;
  }

  clearAllField() {
    this.bookAddForm.get('imagePath').setValue(null);
    this.bookAddForm.get('pageSize').setValue(null);
    this.bookAddForm.get('location').setValue(null);
    this.bookAddForm.get('authorName').setValue(null);
    this.bookAddForm.get('genreName').setValue(null);
    this.bookAddForm.get('money').setValue(null);
    this.bookAddForm.get('bookName').setValue(null);
  }
}
