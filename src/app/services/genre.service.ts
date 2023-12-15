import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../models/entityModels/genre';
import { ListReponseModel } from '../models/responseModels/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  apiUrl: string = 'http://localhost:8080/api/Genres/GetAll';
  
  constructor(private httpClient: HttpClient) {}

  getGenres(): Observable<ListReponseModel<Genre>> {
    return this.httpClient.get<ListReponseModel<Genre>>(this.apiUrl);
  }
}
