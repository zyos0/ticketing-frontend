import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resend-activation',
  templateUrl: './resend-activation.component.html',
  styleUrls: ['./resend-activation.component.scss']
})
export class ResendActivationComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
  }

  submitHandler(form: FormGroup) {
    this.authService.resendActivation(form.value)
      .subscribe(
        () => {
          this.toastr.success('Activation Link sent');
          this.router.navigate(['auth', 'login']);
        },
        ({error}) => {

          this.toastr.error(error.error);
        }
      );

  }

}
