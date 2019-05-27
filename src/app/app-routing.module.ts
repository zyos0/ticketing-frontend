import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CredentialRenderComponent} from './containers/credential-render/credential-render.component';
import {AuthGuard} from '../auth/guards/auth.guard';

const routes: Routes = [
    {path: 'credential-render', component: CredentialRenderComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/credential-render', pathMatch: 'full'}

  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
