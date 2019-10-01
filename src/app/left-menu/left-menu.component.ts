import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from 'src/models/Game';
import { Position } from 'src/models/Position';
import { fillBoard } from './FillBoard';
import { MoveService } from '../move.service';
import { Move } from 'src/models/Move';
import { GameState } from 'src/models/GameState';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(private gameService: GameService, private moveService: MoveService) { }

  // tslint:disable-next-line: no-input-rename
  @Input('game') game: Game;
  // tslint:disable-next-line: no-input-rename
  @Input('selectedPiece') selectedPiece: Position;

  gameId = 1;
  interval;

  newGame() {
    this.gameService.newGame()
      .subscribe((game: Game) => {
        this.game.id = game.id;
        this.game.fen = game.fen;
        // this is to fix a bug where gameState is undefined
        this.game.gameState = new GameState();
        this.game.gameState.activePlayer = game.gameState.activePlayer;
        this.game.gameState.playerInCheck = game.gameState.playerInCheck;
        this.game.gameState.gameOver = game.gameState.gameOver;
        fillBoard(game.fen, this.selectedPiece);
        this.gameId = game.id;
      });
  }

  loadGame() {
    this.gameService.loadGame(this.gameId)
      .subscribe((game: Game) => {
        this.game.id = game.id;
        this.game.fen = game.fen;
        // this is to fix a bug where gameState is undefined
        this.game.gameState = new GameState();
        this.game.gameState.activePlayer = game.gameState.activePlayer;
        this.game.gameState.playerInCheck = game.gameState.playerInCheck;
        this.game.gameState.gameOver = game.gameState.gameOver;
        fillBoard(game.fen, this.selectedPiece);
      });
  }

  singleAi() {
    this.moveService.aiMove((this.gameId))
      .subscribe((move: Move) => {
        this.game.id = move.game.id;
        this.game.fen = move.game.fen;
        this.game.gameState.activePlayer = move.game.gameState.activePlayer;
        this.game.gameState.playerInCheck = move.game.gameState.playerInCheck;
        this.game.gameState.gameOver = move.game.gameState.gameOver;
        fillBoard(move.game.fen, this.selectedPiece);
      });
  }

  multiAi() {
    (document.getElementById('singleAi') as HTMLInputElement).disabled = true;
    (document.getElementById('multiAi') as HTMLInputElement).disabled = true;
    (document.getElementById('stopAi') as HTMLInputElement).disabled = false;
    this.interval = setInterval(_ => {
      this.singleAi();
      if (document.getElementById('gameOverDiv').textContent === 'Game Over!') {
        this.stopAi();
      }
    }, 500);
  }

  stopAi() {
    clearInterval(this.interval);
    (document.getElementById('singleAi') as HTMLInputElement).disabled = false;
    (document.getElementById('multiAi') as HTMLInputElement).disabled = false;
    (document.getElementById('stopAi') as HTMLInputElement).disabled = true;
  }



  ngOnInit() {
    this.loadGame();
  }

}
