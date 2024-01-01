import { Injectable } from '@angular/core';
import { LoginModel } from '../models/entityModels/loginMode';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/responseModels/tokenResponseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';
import { LocalStorageService } from './local-storage-service.service';
import { RegisterModel } from '../models/entityModels/registerModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/api/auths';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(user: LoginModel) {
    let newUrl = this.apiUrl + '/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newUrl, user);
  }

  isAuthenticated() {
    if (this.localStorageService.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  register(user: RegisterModel) {
    let newUrl = this.apiUrl + '/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newUrl, user);
  }
}
