import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  @Input()
  loggedIn: boolean;


  constructor(private readonly authService: AuthService) {

  }

  ngOnInit() {
  }


  logOut() {
    this.authService.logout();
  }


}
