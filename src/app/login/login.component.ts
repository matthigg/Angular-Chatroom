import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkboxRememberMe: boolean;
  errorMessage: string = '';
  formLogin: FormGroup;
  isError: boolean = false;
  isLoading: boolean = false;
  passwordIsVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: this.checkboxRememberMe,
    });
  }

  onSubmit() {
    if (!this.formLogin.valid) { return }
    this.checkboxRememberMe = this.formLogin.get('rememberMe').value;
    this.isLoading = true;
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;
    this.authService.login(username, password)
      .subscribe(
        response => {
          this.isLoading = false;
          this.isError = false;
          this.errorMessage = '';
          console.log(response);
        },
        errorMessage => {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = errorMessage;
        }
      );
  }
}
