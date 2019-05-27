import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-credential-render',
  templateUrl: './credential-render.component.html',
  styleUrls: ['./credential-render.component.scss']
})
export class CredentialRenderComponent implements OnInit {
  credential = {};

  constructor(private authService: AuthService, private readonly toaster: ToastrService) {
  }

  ngOnInit() {
    this.authService.retrieveCredentials().subscribe(
      data => {
        this.credential = {...data, confirmed: data.confirmed ? 'CONFIRMED' : 'UNCONFIRMED'};
      },
      ({error}) => {
        this.toaster.error(error.error);
      }
    );
  }

}
