// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';

// Components
import { CreateAccountComponent } from './create-account.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

// Services
import { AuthService } from '../auth.service';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let inputUsername: HTMLInputElement;
  let inputPassword: HTMLInputElement;
  let inputPasswordRetype: HTMLInputElement;
  let inputEmail: HTMLInputElement;
  let buttonCreateAccount: HTMLButtonElement;
  let buttonVisibility: HTMLButtonElement;
  let controls: HTMLInputElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CreateAccountComponent,
        LoadingSpinnerComponent,
      ],
      imports: [
        BrowserAnimationsModule, 
        HttpClientTestingModule, 
        MatButtonModule, 
        MatCardModule, 
        MatCheckboxModule, 
        MatIconModule, 
        MatInputModule, 
        ReactiveFormsModule, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    inputUsername = fixture.debugElement.query(By.css('.input-username')).nativeElement;
    inputPassword = fixture.debugElement.query(By.css('.input-password')).nativeElement;
    inputPasswordRetype = fixture.debugElement.query(By.css('.input-password-retype')).nativeElement;
    inputEmail = fixture.debugElement.query(By.css('.input-email')).nativeElement;
    buttonCreateAccount = fixture.debugElement.query(By.css('.button-create-account')).nativeElement;
    controls =  [
      inputUsername,
      inputPassword,
      inputPasswordRetype,
      inputEmail
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should disable the 'Create Account' button if the 'Username' input control is empty`, () => {
    controls.forEach(control => {
      if (control === inputUsername) {
        control.value = '';
        control.dispatchEvent(new Event('input'));
      } else {
        control.value = 'test@test';
        control.dispatchEvent(new Event('input'));
      }
    });
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(true);
  });

  it(`should disable the 'Create Account' button if the 'Password' input control is empty`, () => {
    controls.forEach(control => {
      if (control === inputPassword) {
        control.value = '';
        control.dispatchEvent(new Event('input'));
      } else {
        control.value = 'test@test';
        control.dispatchEvent(new Event('input'));
      }
    });
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(true);
  });

  it(`should disable the 'Create Account' button if the 'Password Retype' input control is empty`, () => {
    controls.forEach(control => {
      if (control === inputPasswordRetype) {
        control.value = '';
        control.dispatchEvent(new Event('input'));
      } else {
        control.value = 'test@test';
        control.dispatchEvent(new Event('input'));
      }
    });
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(true);
  });

  it(`should disable the 'Create Account' button if the 'Email' input control is empty`, () => {
    controls.forEach(control => {
      if (control === inputEmail) {
        control.value = '';
        control.dispatchEvent(new Event('input'));
      } else {
        control.value = 'test@test';
        control.dispatchEvent(new Event('input'));
      }
    });
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(true);
  });

  it(`should have an invalid 'passwords' form group if passwords don't match`, () => {
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    inputPasswordRetype.value = 'test-password-retype';
    inputPasswordRetype.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.formCreateAccount.controls.passwords.valid).toEqual(false);
  });

  it(`should have a valid 'passwords' form group if passwords match`, () => {
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    inputPasswordRetype.value = 'test-password';
    inputPasswordRetype.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.formCreateAccount.controls.passwords.valid).toEqual(true);
  });

  it(`should enable the 'Create Account' button if all controls are valid`, () => {
    controls.forEach(control => {
      control.value = 'test@test';
      control.dispatchEvent(new Event('input'));
    });
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(false);
  });

  it(`should capture all form control values if form is valid and user clicks the 'Create Account' button`, () => {
    controls.forEach(control => {
      control.value = 'test@test';
      control.dispatchEvent(new Event('input'));
    });
    buttonCreateAccount.click();
    fixture.detectChanges();
    expect(component.formCreateAccount.value.username).toEqual('test@test');
    expect(component.formCreateAccount.value.passwords.password).toEqual('test@test');
    expect(component.formCreateAccount.value.passwords.passwordRetype).toEqual('test@test');
    expect(component.formCreateAccount.value.email).toEqual('test@test');
  });

  it(`should toggle 'Password' and 'Password Retype' visibility when clicking the visibility icon`, () => {
    buttonVisibility = fixture.debugElement.query(By.css('.button-password-visibility')).nativeElement;
    expect(inputPassword.type).toEqual('password');
    expect(inputPasswordRetype.type).toEqual('password');
    buttonVisibility.click();
    fixture.detectChanges();
    expect(inputPassword.type).toEqual('text');
    expect(inputPasswordRetype.type).toEqual('text');
    buttonVisibility.click();
    fixture.detectChanges();
    expect(inputPassword.type).toEqual('password');
    expect(inputPasswordRetype.type).toEqual('password');
  });

});
