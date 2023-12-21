import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListReponseModel } from '../models/responseModels/listResponseModel';
import { Author } from '../models/entityModels/author';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl: string = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) {}
  getAuthors(): Observable<ListReponseModel<Author>> {
    let newPath = this.apiUrl + 'authors/getall';
    return this.httpClient.get<ListReponseModel<Author>>(newPath);
  }
}
