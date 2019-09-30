import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { Game } from 'src/models/Game';
import { Position } from 'src/models/Position';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'chess-jgnewman';

  user: User;
  game: Game;
  selectedPiece: Position;

  ngOnInit(): void {
    this.user = new User();
    this.game = new Game();
    this.selectedPiece = new Position();

    if (localStorage.getItem('user') != null) {
      this.user.username = localStorage.getItem('user');
      this.user.signedIn = true;
    }

  }



}
