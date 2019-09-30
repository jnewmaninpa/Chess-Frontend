import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('user') user: User;

  constructor() { }

  ngOnInit() {
  }

}
