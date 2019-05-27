import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
  }

  ngOnInit() {
  }

  signUpHandler(form: FormGroup) {
    this.authService.register(form.value)
      .subscribe(
        () => {
          this.toastr.success('Account successfully created, a confirmation email was sent to ' + form.value.email);
          this.router.navigate(['auth', 'login']);
        },
        ({error}) => {

          this.toastr.error(error.error);
        }
      );


  }

}
