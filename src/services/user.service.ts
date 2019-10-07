import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  checkPassword(user: User) {
    const Url = environment.backEndUrl + 'user/login';
    return this.http.post(Url, user, this.httpOptions);
  }

  createUser(user: User) {
    const Url = environment.backEndUrl + 'user/new';
    return this.http.post(Url, user, this.httpOptions);
  }

}
