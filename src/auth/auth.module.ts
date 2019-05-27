import {ModuleWithProviders, NgModule} from '@angular/core';

import {LoginComponent} from './login/login/login.component';
import {SignupComponent} from './signup/signup/signup.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {ScopeSelectorComponent} from './components/scope-selector/scope-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AuthGuard} from './guards/auth.guard';
import {UnauthGuard} from './guards/unauth.guard';
import {ForgotComponent} from './forgot/forgot.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import {ResendActivationComponent} from './resend-activation/resend-activation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [LoginComponent, SignupComponent, AuthFormComponent, ScopeSelectorComponent,
    ForgotComponent, ConfirmComponent, PasswordRecoveryComponent, ResendActivationComponent],
  imports: [AuthRoutingModule, ReactiveFormsModule, FormsModule, BrowserModule, FontAwesomeModule],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuard, UnauthGuard],
  bootstrap: []
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        AuthGuard, UnauthGuard
      ]
    };
  }
}
