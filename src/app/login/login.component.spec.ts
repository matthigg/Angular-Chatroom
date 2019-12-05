// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './login.component';

// Angular Material Modules & HammerJS
import 'hammerjs';
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
} from '@angular/material';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let inputUsername: HTMLInputElement;
  let inputPassword: HTMLInputElement;
  let buttonLogin: HTMLButtonElement;
  let checkboxRememberMe: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    inputPassword = fixture.debugElement.query(By.css('.input-password')).nativeElement;
    inputUsername = fixture.debugElement.query(By.css('.input-username')).nativeElement;
    buttonLogin = fixture.debugElement.query(By.css('.button-login')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should disable the 'Login' button if the Username input field is empty`, () => {
    inputUsername.value = '';
    inputUsername.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonLogin.disabled).toEqual(true);
  });

  it(`should disable the 'Login' button if the Password input field is empty`, () => {
    inputPassword.value = '';
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonLogin.disabled).toEqual(true);
  });

  it(`should enable the 'Login' button if the Username and Password input fields are not empty`, () => {
    inputUsername.value = 'test-user';
    inputUsername.dispatchEvent(new Event('input'));
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonLogin.disabled).toEqual(false);
  })

  it(`should capture the Username & Password on form submission`, () => {
    inputUsername.value = 'test-user';
    inputUsername.dispatchEvent(new Event('input'));
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    buttonLogin.click();
    fixture.detectChanges();
    expect(component.formLogin.value.username).toEqual('test-user');
    expect(component.formLogin.value.password).toEqual('test-password');
  });
  
  it(`should capture the 'Remember Me' checkbox status on form submission`, () => {
    checkboxRememberMe = fixture.debugElement.query(By.css('.checkbox-remember-me')).nativeElement;
    (checkboxRememberMe.firstElementChild as HTMLInputElement).click();
    expect(component.formLogin.value.rememberMe).toEqual(true);
  })

});
