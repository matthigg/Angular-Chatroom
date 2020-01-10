// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// RxJS
import { of, throwError } from 'rxjs';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules & HammerJS
import 'hammerjs';
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';

// Components
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { LoginComponent } from './login.component';

// Services
import { AuthService } from '../services/auth.service';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

// Mocks
class MockAngularFirestore {

}

describe('LoginComponent', () => {
  let buttonLogin: HTMLButtonElement;
  let buttonVisibility: HTMLButtonElement;
  let checkboxRememberMe: HTMLInputElement;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let inputPassword: HTMLInputElement;
  let inputEmail: HTMLInputElement;
  let controls: HTMLInputElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoadingSpinnerComponent,
        LoginComponent,
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
        RouterTestingModule,
      ],
      providers: [ 
        AuthService,
        { provide: AngularFirestore, useClass: MockAngularFirestore },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    inputEmail = fixture.debugElement.query(By.css('.input-email')).nativeElement;
    inputPassword = fixture.debugElement.query(By.css('.input-password')).nativeElement;
    buttonLogin = fixture.debugElement.query(By.css('.button-login')).nativeElement;
    controls = [
      inputEmail,
      inputPassword,
    ]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should disable the 'Login' button if the 'Email' input field is empty`, () => {
    inputEmail.value = '';
    inputEmail.dispatchEvent(new Event('input'));
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonLogin.disabled).toEqual(true);
  });

  it(`should disable the 'Login' button if the 'Password' input field is empty`, () => {
    inputEmail.value = 'test@test';
    inputEmail.dispatchEvent(new Event('input'));
    inputPassword.value = '';
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonLogin.disabled).toEqual(true);
  });

  it(`should enable the 'Login' button if the 'Email' and 'Password' input fields are not empty`, () => {
    inputEmail.value = 'test@test';
    inputEmail.dispatchEvent(new Event('input'));
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonLogin.disabled).toEqual(false);
  });

  it(`should have the onSubmit() function return 'null' if the account creation form is invalid`, () => {
    const onSubmitResult = component.onSubmit();
    expect(onSubmitResult).toEqual(null);
  });

  it(`should capture the 'Email' & 'Password' on form submission`, () => {
    inputEmail.value = 'test@test';
    inputEmail.dispatchEvent(new Event('input'));
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    buttonLogin.click();
    fixture.detectChanges();
    expect(component.formLogin.value.email).toEqual('test@test');
    expect(component.formLogin.value.password).toEqual('test-password');
  });
  
  it(`should capture the 'Remember Me' checkbox status on form submission`, () => {
    checkboxRememberMe = fixture.debugElement.query(By.css('.checkbox-remember-me')).nativeElement;
    (checkboxRememberMe.firstElementChild as HTMLInputElement).click();
    expect(component.formLogin.value.rememberMe).toEqual(true);
  });

  it(`should toggle 'Password' visibility when clicking the visibility icon`, () => {
    buttonVisibility = fixture.debugElement.query(By.css('.button-password-visibility')).nativeElement;
    expect(inputPassword.type).toEqual('password');
    buttonVisibility.click();
    fixture.detectChanges();
    expect(inputPassword.type).toEqual('text');
    buttonVisibility.click();
    fixture.detectChanges();
    expect(inputPassword.type).toEqual('password');
  });

  it(`should not show an error message if a successful response is received from authService.login()`, () => {
    spyOn(component['authService'], 'login').and.returnValue(of(
      {
        kind: '',
        idToken: '',
        email: '',
        refreshToken: '',
        expiresIn: '',
        localId: '',
      }
    ))()
      .subscribe(
        response => expect(response).toBeTruthy(),
        error => expect(error).toBeFalsy(),
      );

    controls.forEach(control => {
      control.value = 'test@test';
      control.dispatchEvent(new Event('input'))
    });
    fixture.detectChanges();
    buttonLogin.click();

    expect(component.isError).toEqual(false);
    expect(component.errorMessage).toBeFalsy();
  });

  it(`should show an error message if an error is thrown from authService.login()`, () => {
    spyOn(component['authService'], 'login').and.returnValue(
      throwError(new Error('fake error'))
    )()
      .subscribe(
        response => expect(response).toBeFalsy(),
        error => expect(error).toBeTruthy(),
      );

    controls.forEach(control => {
      control.value = 'test@test';
      control.dispatchEvent(new Event('input'))
    });
    fixture.detectChanges();
    buttonLogin.click();

    expect(component.isError).toEqual(true);
    expect(component.errorMessage).toBeTruthy();
  });
});
