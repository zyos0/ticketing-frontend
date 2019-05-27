import {Injectable, OnInit} from '@angular/core';
import {ForgotPasswordModel, LoginModel, NewPasswordModel, RegisterModel, TokenResponseModel} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {finalize, tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class AuthService {
  private tokenPrefix = 'authToken';

  private baseUrl = `${environment.apiUrl}/auth`;
  authData = new BehaviorSubject(null);

  constructor(private readonly http: HttpClient, private router: Router) {
    this.authData.next(this.retrieveToken());
  }


  public storeToken(token) {
    localStorage.setItem(this.tokenPrefix, JSON.stringify(token));
    this.authData.next(token);

  }

  public retrieveToken() {
    const token = localStorage.getItem(this.tokenPrefix);
    return token
      ? JSON.parse(token)
      : null;
  }

  private deleteToken() {
    localStorage.removeItem(this.tokenPrefix);
    this.authData.next(null);
  }

  public login(payload: LoginModel): Observable<TokenResponseModel> {
    return this.http.post<TokenResponseModel>(`${this.baseUrl}/login`, payload)
      .pipe(
        tap(tokenResponse => this.storeToken(tokenResponse.token)),
        finalize(() => {
          this.router.navigate(['']);
        })
      );


  }

  public register(payload: RegisterModel): Observable<TokenResponseModel> {
    return this.http.post<TokenResponseModel>(`${this.baseUrl}/signup`, payload);

  }

  public retrieveCredentials(): Observable<any> {
    return this.http.get(`${this.baseUrl}/check-token`);
  }

  public confirmCredentials(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirm`, {confirmToken: token});
  }


  public forgotPassword(payload: ForgotPasswordModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, payload);
  }

  public updatePassword(payload: NewPasswordModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, payload);
  }

  public resendActivation(payload: LoginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/resend-activation`, payload);
  }

  public logout() {
    this.deleteToken();
    this.router.navigate(['auth', 'login']);
  }


}
