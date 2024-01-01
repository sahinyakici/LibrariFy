import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/responseModels/listResponseModel';
import { Book } from '../models/entityModels/book';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl: string = 'http://localhost:8080/api/books';

  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<ListReponseModel<Book>> {
    let newPath = this.apiUrl + '/getallnotrented';
    return this.httpClient.get<ListReponseModel<Book>>(newPath);
  }

  getBooksById(bookId: string): Observable<SingleResponseModel<Book>> {
    let newPath = this.apiUrl + '/getbyid?guid=' + bookId;
    return this.httpClient.get<SingleResponseModel<Book>>(newPath);
  }

  getBooksByGenre(genreId: string) {
    let newPath = this.apiUrl + '/getallbygenre?id=' + genreId;
    return this.httpClient.get<ListReponseModel<Book>>(newPath);
  }

  addBook(book: any, image: File): Observable<ResponseModel> {
    const newPath = this.apiUrl + '/Add';
    const formData: FormData = new FormData();

    for (const key in book) {
      formData.append(key, book[key]);
    }

    formData.append('image', image);

    return this.httpClient.post<ResponseModel>(newPath, formData);
  }

  getAllBooksWithUserName(
    userName: string
  ): Observable<ListReponseModel<Book>> {
    let newPath = this.apiUrl + '/getallbyownername?ownerName=' + userName;
    return this.httpClient.get<ListReponseModel<Book>>(newPath);
  }

  editBook(book: Book) {
    return this.httpClient.put(this.apiUrl, book);
  }

  deleteBook(bookId: string) {
    const newPath = `${this.apiUrl}/delete?id=${bookId}`;
    return this.httpClient.delete(newPath);
  }
}
