import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login/login.component';
import {SignupComponent} from './signup/signup/signup.component';
import {UnauthGuard} from './guards/unauth.guard';
import {ForgotComponent} from './forgot/forgot.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {AuthGuard} from './guards/auth.guard';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import {ResendActivationComponent} from './resend-activation/resend-activation.component';

const routes: Routes = [
    {
      path: 'auth', children: [
        {path: 'login', component: LoginComponent, canActivate: [UnauthGuard]},
        {path: 'signup', component: SignupComponent, canActivate: [UnauthGuard]},
        {path: 'forgot', component: ForgotComponent, canActivate: [UnauthGuard]},
        {path: 'confirm', component: ConfirmComponent},
        {path: 'password-recovery', component: PasswordRecoveryComponent},
        {path: 'resend-activation', component: ResendActivationComponent},
      ],

    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
