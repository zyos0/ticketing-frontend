import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;

  constructor(
    private readonly authService: AuthService,
    private readonly  formBuilder: FormBuilder,
    private readonly  toasterService: ToastrService,
    private readonly router: Router
  ) {

  }

  ngOnInit() {
    this.initForm();
  }


  public initForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }


  public submitForm() {
    if (!this.form.valid) {
      return;
    }
    this.authService.forgotPassword(this.form.value).subscribe(
      () => {
        const {email} = this.form.value;
        this.toasterService.success(`Forgot Password link sent to ${email}`);
        this.router.navigate(['auth', 'login']);
      },
      () => this.toasterService.error('invalid email')
    );

  }

  public displayError(field: string): boolean {
    const control = this.form.controls[field];
    return control.invalid &&
      ((control.dirty || control.touched) || this.isSubmitted);
  }


}
