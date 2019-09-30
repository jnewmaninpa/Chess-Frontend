import { Component, OnInit, Input } from '@angular/core';
import { Square } from 'src/models/Square';
import { Game } from 'src/models/Game';
import { Position } from 'src/models/Position';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  // tslint:disable-next-line: no-input-rename
  @Input('selectedPiece') selectedPiece: Position;
  squares: Array<Square>;
  // tslint:disable-next-line: no-input-rename
  @Input('game') game: Game;

  showBoard() {

    this.squares = new Array<Square>();

    this.selectedPiece.number = null;

    for (let y = 7; y >= 0; y--) {
        for (let x = 0; x <= 7; x++) {

            const id = 8 * y + x;

            const square = new Square();
            if (x % 2 === y % 2) {
              square.color = 'black';
            } else {
              square.color = 'white';
            }
            square.id = id;
            this.squares.push(square);
            // div.addEventListener("click", myFunction);
        }
    }
}



  ngOnInit() {
    this.showBoard();
  }

}
