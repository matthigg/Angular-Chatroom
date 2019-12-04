import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group(
    {
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    },
  );

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('loginForm:', this.loginForm.value);
  }

}
