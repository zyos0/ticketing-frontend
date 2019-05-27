import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly  toasterService: ToastrService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      switchMap(({token}) => this.authService.confirmCredentials(token))
    ).subscribe(
      () => {
        this.toasterService.success('Account confirmed');
        this.authService.logout();
      },
      ({error}) => this.toasterService.error(error.error)
    );
  }

}
