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
  errorMatcher = new CrossFieldErrorMatcher();
  formCreateAccount: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formCreateAccount = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        passwordRetype: ['', [Validators.required]],
      }, { validators: passwordsMatch }),
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    
  }

}
