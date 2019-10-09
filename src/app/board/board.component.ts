import { Component, OnInit, AfterViewInit, Input, HostListener } from '@angular/core';
import { Square } from 'src/models/Square';
import { Game } from 'src/models/Game';
import { Position } from 'src/models/Position';

function getMarginAndBorderHeight(element: HTMLElement) {
  const computedStyle = getComputedStyle(element);
  let margin = parseInt(computedStyle.marginTop, 10) + parseInt(computedStyle.marginBottom, 10);
  let border = parseInt(computedStyle.borderTop, 10) + parseInt(computedStyle.borderBottom, 10);
  if (isNaN(margin)) {
    margin = 0;
  }
  if (isNaN(border)) {
    border = 10;
  }

  return margin + border;
}

function getinnerHeight(element: HTMLElement) {
  const computedStyle = getComputedStyle(element);
  let margin = parseInt(computedStyle.marginTop, 10) + parseInt(computedStyle.marginBottom, 10);
  let border = parseInt(computedStyle.borderTop, 10) + parseInt(computedStyle.borderBottom, 10);
  let height = parseInt(computedStyle.height, 10);
  if (isNaN(margin)) {
    margin = 0;
  }
  if (isNaN(border)) {
    border = 10;
  }
  if (isNaN(height)) {
    height = 0;
  }
  return margin + border + height;
}

function getinnerWidth(element: HTMLElement) {
  const computedStyle = getComputedStyle(element);
  let margin = parseInt(computedStyle.marginLeft, 10) + parseInt(computedStyle.marginRight, 10);
  let border = parseInt(computedStyle.borderLeft, 10) + parseInt(computedStyle.borderRight, 10);
  let height = parseInt(computedStyle.width, 10);
  if (isNaN(margin)) {
    margin = 0;
  }
  if (isNaN(border)) {
    border = 10;
  }
  if (isNaN(height)) {
    height = 0;
  }
  return margin + border + height;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {

  constructor() { }

  // tslint:disable-next-line: no-input-rename
  @Input('selectedPiece') selectedPiece: Position;
  squares: Array<Square>;
  // tslint:disable-next-line: no-input-rename
  @Input('game') game: Game;
  // tslint:disable-next-line: no-input-rename
  @Input('mobileQuery') mobileQuery;

  @HostListener('window:resize', [])
  onResize() {
    this.resizeBoard();
  }

  resizeBoard() {
    let size: number;
    const boardElement = document.getElementById('board');
    const headerHeight = getinnerHeight(document.getElementById('header'));

    console.log(getMarginAndBorderHeight(boardElement));

    if (this.mobileQuery.matches) {
      if ((window.innerHeight - headerHeight) > window.innerWidth) {
        size = window.innerWidth - getMarginAndBorderHeight(boardElement);
      } else {
        size = window.innerHeight - (getinnerHeight(document.getElementById('header')) + getMarginAndBorderHeight(boardElement));
      }
    } else {
      const sidebarWidth = getinnerWidth(document.getElementById('side-bar'));
      if ((window.innerHeight - headerHeight) > (window.innerWidth - sidebarWidth)) {
        size = window.innerWidth - sidebarWidth - getMarginAndBorderHeight(boardElement);
      } else {
        size = window.innerHeight - (headerHeight + getMarginAndBorderHeight(boardElement));
      }
    }


    boardElement.style.width = size + 'px';
    boardElement.style.height = size + 'px';
  }

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
        }
    }
}

  ngOnInit() {
    this.showBoard();
  }

  ngAfterViewInit() {
    this.resizeBoard();
  }

}
