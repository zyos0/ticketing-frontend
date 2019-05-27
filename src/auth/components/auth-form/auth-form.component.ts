import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  public form: FormGroup;
  isSubmitted = false;
  @Input()
  signupForm: boolean;


  @Output()
  submitted = new EventEmitter<FormGroup>();

  constructor(private readonly formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[\d\W])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
            )]],
      }
    );

    if (this.signupForm) {
      this.form.addControl('scope',
        this.formBuilder.control(
          null, [Validators.required]));
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  public getErrors(field, error) {
    const control = this.form.controls[field];
    return control.errors[error];
  }


  public displayError(field: string): boolean {
    const control = this.form.controls[field];
    return control.invalid &&
      ((control.dirty || control.touched) || this.isSubmitted);
  }

}
