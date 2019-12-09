import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroupDirective, 
  FormGroup, 
  ValidationErrors,
  Validators 
} from '@angular/forms';

// Angular Material Modules
import { ErrorStateMatcher } from '@angular/material';

// Services
import { AuthService } from '../auth.service';

// Password Validator
function passwordsMatch(formGroup: FormGroup): ValidationErrors | null {
  const passwordsMatch = formGroup.get('password').value === formGroup.get('passwordRetype').value;
  return passwordsMatch ? null : { 'noMatch': true };
};

// Cross-Field Error Matcher
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control.parent.invalid && (control.dirty || control.touched || isSubmitted));
  }
};

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  alreadyExists: boolean = false;
  errorMatcher = new CrossFieldErrorMatcher();
  formCreateAccount: FormGroup;
  passwordIsVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formCreateAccount = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordRetype: ['', [Validators.required]],
      }, { validators: passwordsMatch }),
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    if (!this.formCreateAccount.valid) { return }
    const email = this.formCreateAccount.value.email;
    const password = this.formCreateAccount.value.passwords.password;
    this.authService.signUp(email, password).subscribe(
      resData => { console.log(resData); },
      error => { 
        if (error.error.error.message === 'EMAIL_EXISTS') {
          this.alreadyExists = true;
        }
       },
    );
  }

  // test() {
  //   console.log(this.alreadyExists);
  // }

}