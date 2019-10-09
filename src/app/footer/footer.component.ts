import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/User';
import { Game } from 'src/models/Game';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('user') user: User;

  logout() {
    this.user.username = null;
    this.user.password = null;
    this.user.signedIn = false;
    localStorage.removeItem('user');
  }

  constructor() { }

  ngOnInit() {
  }

}
