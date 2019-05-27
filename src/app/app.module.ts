import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './containers/app/app.component';
import {AppComponents} from './components';
import {AppContainers} from './containers';
import {RouterModule} from '@angular/router';
import {AuthModule} from '../auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CredentialRenderComponent} from './containers/credential-render/credential-render.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import './awesome.fonts';

@NgModule({
  declarations: [
    ...AppComponents,
    ...AppContainers,
    CredentialRenderComponent
  ],
  imports: [
    NgbModule,
    FontAwesomeModule,
    BrowserModule,
    RouterModule,
    AuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
