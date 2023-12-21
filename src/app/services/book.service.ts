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

  getBooksByGenre(genreId: string) {
    let newPath = this.apiUrl + 'books/getallbygenre?id=' + genreId;
    return this.httpClient.get<ListReponseModel<Book>>(newPath);
  }

  addBook(book: any, image: File): Observable<ResponseModel> {
    const headers = new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYyZGM5MjE4LWQ0Y2ItNDBjMS04MjYxLTFiYjljNjI3NWVhZiIsImVtYWlsIjoic2FoaW5AYWRtaW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IsWeYWhpbiBZQUtJQ0kiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwibmJmIjoxNzAzMTkxODk2LCJleHAiOjE3MDMxOTkwOTYsImlzcyI6InNhaGlueWFraWNpQHNhaGluLmNvbSIsImF1ZCI6InNhaGlueWFraWNpQHNhaGluLmNvbSJ9.R3GWmdfKocYZ-8YMjItEGps62M0ukJ_VHPhGsB6JrS6QNsk_qDL3pxUeHDD-kwcR7zmL9TXHacpOt_m9FTCbMA`,
    });

    const options = { headers: headers };
    const newPath = this.apiUrl + 'Books/Add';
    const formData:FormData = new FormData();

    for (const key in book) {
      formData.append(key, book[key]);
    }
    
    formData.append('image', image);
    return this.httpClient.post<ResponseModel>(newPath, formData, options);
  }
}
