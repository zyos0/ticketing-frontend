import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate() {
    const token = this.authService.retrieveToken();
    if (token) {
      this.router.navigate(['/credential-render']);

    }
    return !token;
  }

}
