import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroupDirective, 
  FormGroup, 
  ValidationErrors,
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material Modules
import { ErrorStateMatcher } from '@angular/material';

// Services
import { AuthService } from '../services/auth.service';

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
  errorMessage: string = '';
  formCreateAccount: FormGroup;
  isError: boolean = false;
  isLoading: boolean = false;
  passwordIsVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formCreateAccount = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordRetype: ['', [Validators.required]],
      }, { validators: passwordsMatch }),
      email: ['', [Validators.required, Validators.email]],
    });
  }

  createAccount(userName, email, password) {
    this.authService.createAccount(userName, email, password)
      .subscribe(
        response => { 
          console.log('=== response:', response)
          this.isLoading = false;
          this.isError = false;
          this.errorMessage = '';
          this.router.navigate(['/']);
        },
        error => { 
          console.log('=== error:', error)
          this.isLoading = false; 
          this.isError = true; 
          this.errorMessage = error; 
          console.log('=== this.isError:', this.isError);
          console.log('=== this.errorMessage:', this.errorMessage);
        },
      );
  }

  async onSubmit() {
    if (!this.formCreateAccount.valid) throw null
    this.isLoading = true;
    const userName = this.formCreateAccount.value.username;
    const email = this.formCreateAccount.value.email;
    const password = this.formCreateAccount.value.passwords.password;
    await this.authService.checkIfUsernameOrEmailExists(userName, email)
      .then(response => this.createAccount(userName, email, password))
      .catch(error => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error;
      });
  }
}