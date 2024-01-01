import { RentModel } from './../models/entityModels/rent';
import {ReturnRent} from './../models/entityModels/rentReturned'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModels/responseModel';
import { ListReponseModel } from '../models/responseModels/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private apiUrl: string = 'http://localhost:8080/api/rentals/';
  constructor(private httpClient: HttpClient) {}

  rentBook(rentModel: RentModel): Observable<ResponseModel> {
    const newApi = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newApi, rentModel);
  }

  getRentalBookByUserName(
    userName: string
  ): Observable<ListReponseModel<ReturnRent>> {
    const newPath = this.apiUrl + 'getrentalsbyusername?userName=' + userName;
    return this.httpClient.get<ListReponseModel<ReturnRent>>(newPath);
  }

  cancelRent(rentId: string): Observable<ResponseModel> {
    const newPath = this.apiUrl + 'cancelrental?rentalId='+rentId;
    return this.httpClient.patch<ResponseModel>(newPath,null);
  }
}
