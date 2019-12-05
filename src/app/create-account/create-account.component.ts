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

// Password Validator
function passwordsMatch(formGroup: FormGroup): ValidationErrors | null {
  const passwordsMatch = formGroup.get('password').value === formGroup.get('passwordRetype').value;
  return passwordsMatch ? null : { 'noMatch': true };
};
// Cross-Field Error Matcher
// https://itnext.io/materror-cross-field-validators-in-angular-material-7-97053b2ed0cf
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  formCreateAccount = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    passwordRetype: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  }, { validators: passwordsMatch })
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
