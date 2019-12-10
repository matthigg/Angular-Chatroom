// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { LoginComponent } from './login.component';

// Services
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let buttonLogin: HTMLButtonElement;
  let buttonVisibility: HTMLButtonElement;
  let checkboxRememberMe: HTMLInputElement;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let inputPassword: HTMLInputElement;
  let inputEmail: HTMLInputElement;

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
      ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    inputPassword = fixture.debugElement.query(By.css('.input-password')).nativeElement;
    inputEmail = fixture.debugElement.query(By.css('.input-email')).nativeElement;
    buttonLogin = fixture.debugElement.query(By.css('.button-login')).nativeElement;
    fixture.detectChanges();
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
    console.log(inputEmail.value, inputPassword.value, buttonLogin)
    console.log(fixture.debugElement.query(By.css('.button-login')))
    expect(buttonLogin.disabled).toEqual(false);
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

});
