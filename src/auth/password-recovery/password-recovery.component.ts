import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tostrService: ToastrService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.form = this.formBuilder.group({
      password: [null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[\d\W])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
          )
        ]]
    });
  }

  async handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.activatedRoute.queryParams.subscribe(
      ({token}) => {
        const {password} = this.form.value;
        this.authService.updatePassword({password, resetToken: token}).subscribe(
          () => {
            this.tostrService.success('The password was successfully updated');
            this.router.navigate(['auth', 'login']);
          },
          ({error}) => {
            this.tostrService.error(error.error);
          }
        );
      }
    );

  }

  public displayError(field: string): boolean {
    const control = this.form.controls[field];
    return control.invalid &&
      ((control.dirty || control.touched) || this.isSubmitted);
  }


}
