import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/User';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('user') user: User;
  // tslint:disable-next-line: no-input-rename
  @Input('sidenav') sidenav: MatSidenav;
  // tslint:disable-next-line: no-input-rename
  @Input('mobileQuery') mobileQuery;

  constructor() { }

  ngOnInit() {
  }

}
