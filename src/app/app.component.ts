import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { User } from 'src/models/User';
import { Game } from 'src/models/Game';
import { Position } from 'src/models/Position';
import { GameState } from 'src/models/GameState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  title = 'chess-jgnewman';
  opened: boolean;

  user: User;
  game: Game;
  selectedPiece: Position;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.user = new User();
    this.game = new Game();
    this.game.gameState = new GameState();
    this.selectedPiece = new Position();

    if (localStorage.getItem('user') != null) {
      this.user.username = localStorage.getItem('user');
      this.user.signedIn = true;
    }

  }

}
