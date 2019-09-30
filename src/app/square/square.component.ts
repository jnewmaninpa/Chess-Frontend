import { Component, OnInit, Input } from '@angular/core';
import { MoveService } from '../move.service';
import { Move } from 'src/models/Move';
import { Game } from 'src/models/Game';
import { Square } from 'src/models/Square';
import { LegalMovesModel } from 'src/models/LegalMovesModel';
import { Position } from 'src/models/Position';
import { fillBoard } from '../left-menu/FillBoard';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  constructor(private moveService: MoveService) { }

  id: number;
  // tslint:disable-next-line: no-input-rename
  @Input('game') game: Game;
  // tslint:disable-next-line: no-input-rename
  @Input('square') square: Square;
  // tslint:disable-next-line: no-input-rename
  @Input('selectedPiece') selectedPiece: Position;

  myFunction() {
    const element = document.getElementById(this.square.id.toString());
    if (element.style.color === 'blue') {
        // The button was already selected before
        element.style.color = 'black';
        this.selectedPiece.number = null;

      // Find the legal moves and unhighlight them
        this.moveService.legalMoves(this.game.id, this.square.id)
        .subscribe((legalMovesModel: LegalMovesModel) => {
          const moves = legalMovesModel.legalMoves;
          moves.forEach(move => {
            if ((Math.floor(move.position.number / 8)) % 2 === (move.position.number % 8) % 2) {
              document.getElementById(move.position.number.toString()).className = 'black';
            } else {
              document.getElementById(move.position.number.toString()).className = 'white';
            }
          });
        });
    } else if (element.textContent !== '' && this.selectedPiece.number == null) {
        element.style.color = 'blue';
        this.selectedPiece.number = this.square.id;

        // Find the legal moves and highlight them
        this.moveService.legalMoves(this.game.id, this.square.id)
        .subscribe((legalMovesModel: LegalMovesModel) => {
          const moves = legalMovesModel.legalMoves;
          if (moves.length !== 0) {
            moves.forEach(move => {
              document.getElementById(move.position.number.toString()).className = 'selected';
            });
          } else {
            element.style.color = 'black';
            this.selectedPiece.number = null;
          }
        });
    } else {
        // There is no piece at that button

        if (this.selectedPiece.number != null) {
          // Find the legal moves and unhighlight them

          document.getElementById(this.selectedPiece.number.toString()).style.color = 'black';
          const pieceToMove = this.selectedPiece.number;
          this.selectedPiece.number = null;

          if (pieceToMove != null) {
              // call to see if move is valid and update board

              if (document.getElementById(pieceToMove.toString()).innerHTML === '♙' ||
              document.getElementById(pieceToMove.toString()).innerHTML === '♟') {
                this.moveService.upgradeMove(this.game.id, pieceToMove, this.square.id, 'QUEEN')
                  .subscribe((move: Move) => {
                    if (move.isValid) {
                      fillBoard(move.game.fen, this.selectedPiece);
                      this.game.activePlayer = move.game.activePlayer;
                      this.game.fen = move.game.fen;
                      this.game.gameOver = move.game.gameOver;
                      this.game.id = move.game.id;
                      this.game.playerInCheck = move.game.playerInCheck;
                  } else {
                      // moves was not valid, do nothing
                  }
                  },
                  error => {
                    this.selectedPiece.number = pieceToMove;
                    document.getElementById(this.selectedPiece.number.toString()).style.color = 'blue';
                  });
              } else {
                this.moveService.move(this.game.id, pieceToMove, this.square.id)
                  .subscribe((move: Move) => {
                    if (move.isValid) {
                      fillBoard(move.game.fen, this.selectedPiece);
                      this.game.activePlayer = move.game.activePlayer;
                      this.game.fen = move.game.fen;
                      this.game.gameOver = move.game.gameOver;
                      this.game.id = move.game.id;
                      this.game.playerInCheck = move.game.playerInCheck;
                  } else {
                      // moves was not valid, do nothing
                  }
                  });
                }
            }
        }
    }
}

  ngOnInit() {
  }

}
