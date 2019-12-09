import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkboxRememberMe: boolean;
  formLogin: FormGroup;
  passwordIsVisible: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: this.checkboxRememberMe,
    });
  }

  onSubmit() {
    this.checkboxRememberMe = this.formLogin.get('rememberMe').value;
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  }

}
