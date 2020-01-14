import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';

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
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: this.checkboxRememberMe,
    });
  }

  onSubmit() {
    if (!this.formLogin.valid) { return null }
    this.checkboxRememberMe = this.formLogin.get('rememberMe').value;
    this.isLoading = true;
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;
    this.authService.login(email, password)
      .then(response => {
        this.isLoading = false;
        this.isError = false;
        this.errorMessage = '';
      })
      .catch(error => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Error: Invalid login email and/or password.';
      });
  }
}
