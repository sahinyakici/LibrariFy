import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';
import { UserGetModel } from '../models/entityModels/user-get-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = 'http://localhost:8080/api/users/';

  constructor(private httpClient: HttpClient) {}

  getUserWithUserName(
    userName: string
  ): Observable<SingleResponseModel<UserGetModel>> {
    const newUrl: string = this.apiUrl + 'getbyusername?userName=' + userName;
    return this.httpClient.get<SingleResponseModel<UserGetModel>>(newUrl);
  }
}
