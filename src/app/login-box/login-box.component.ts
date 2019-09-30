import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
  constructor(private userService: UserService) { }

  // tslint:disable-next-line: no-input-rename
  @Input('user') user: User;

  login() {
    this.userService.checkPassword(this.user)
      .subscribe((data: boolean) => {
        if (data) {
          this.user.signedIn = data;
          localStorage.setItem('user', this.user.username);
        } else {
          alert('Incorrect Username or Password');
        }
      });
    }

  create_account() {
    this.userService.createUser(this.user)
      .subscribe((data: User) => {
        this.user = {
        username: data.username,
        password: data.password,
        signedIn: true,
      };
        this.user.signedIn = true;
    },
      error => alert('Username already exists'));
  }

  ngOnInit() {
  }

}
