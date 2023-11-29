import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookResponseModel } from '../models/bookResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl: string = 'http://localhost:5172/api/Books/GetAll';

  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<BookResponseModel> {
    return this.httpClient.get<BookResponseModel>(this.apiUrl);
  }
}
