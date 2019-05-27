import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.retrieveToken();
    const isUrlAuthorizable = req.url
      .split('/')
      .find((chunk) => chunk === 'auth');


    const authReq =
      token && isUrlAuthorizable
        ? req.clone({headers: req.headers.set('token', token)})
        : req;

    return next.handle(authReq).pipe(
      catchError((response) => {

        if (response) {
          if (response.status === 401) {
            this.authService.logout();
          }
        } else {
          this.authService.logout();
        }
        return throwError(response);
      })
    );
  }


}
