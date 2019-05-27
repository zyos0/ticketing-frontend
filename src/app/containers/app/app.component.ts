import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {

  }

  title = 'ticketing-front';

  ngOnInit(): void {
    this.authService.authData.subscribe(
      (data) => {
        this.isLoggedIn = !!data;
      }
    );
  }
}
