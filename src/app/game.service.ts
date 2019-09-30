import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  newGame() {
    const Url = environment.backEndUrl + 'game';
    return this.http.get(Url);
  }

  loadGame(gameId: number) {
    const Url = environment.backEndUrl + 'game/' + gameId;
    return this.http.get(Url);
  }

}
