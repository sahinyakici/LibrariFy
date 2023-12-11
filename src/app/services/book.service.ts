import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/responseModels/listResponseModel';
import { Book } from '../models/entityModels/book';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl: string = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<ListReponseModel<Book>> {
    let newPath = this.apiUrl + 'books/getall';
    return this.httpClient.get<ListReponseModel<Book>>(newPath);
  }

  getBooksById(bookId: string): Observable<SingleResponseModel<Book>> {
    let newPath = this.apiUrl + 'books/getbyid?guid=' + bookId;
    return this.httpClient.get<SingleResponseModel<Book>>(newPath);
  }
}
