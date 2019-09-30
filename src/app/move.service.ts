import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  legalMoves(gameId: number, pieceId: number) {
    const Url = environment.backEndUrl + 'legalMoves/' + gameId + '/' + pieceId;
    return this.http.get(Url);
  }

  move(gameId: number, pieceId: number, finPosId: number) {
    const Url = environment.backEndUrl + 'move/' + gameId + '/' + pieceId + '/' + finPosId;
    return this.http.get(Url);
  }

  upgradeMove(gameId: number, pieceId: number, finPosId: number, upgrade: string) {
    const Url = environment.backEndUrl + 'move/' + gameId + '/' + pieceId + '/' + finPosId + '/' + upgrade;
    return this.http.get(Url);
  }

  aiMove(gameId: number) {
    const Url = environment.backEndUrl + 'ai/move/' + gameId;
    return this.http.get(Url);
  }

}
