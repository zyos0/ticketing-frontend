import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  loginHandler(form: FormGroup) {
    this.authService.login(form.value)
      .subscribe(
        () => {
        },
        ({error}) => {

          this.toastr.error(error.error);
        }
      );

  }

}
