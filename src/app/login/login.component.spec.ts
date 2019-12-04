// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './login.component';

// Angular Material Modules
import { 
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let inputUsername: HTMLInputElement;
  let inputPassword: HTMLInputElement;
  let loginButton: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
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
    loginButton = fixture.debugElement.query(By.css('.button-login')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should disable the 'Login' button if the Username input field is empty`, () => {
    inputUsername.value = '';
    inputUsername.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(loginButton.disabled).toEqual(true);
  });

  it(`should disable the 'Login' button if the Password input field is empty`, () => {
    inputPassword.value = '';
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(loginButton.disabled).toEqual(true);
  });

  it(`should enable the 'Login' button if the Username and Password input fields are not empty`, () => {
    inputUsername.value = 'test-user';
    inputUsername.dispatchEvent(new Event('input'));
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(loginButton.disabled).toEqual(false);
  })

  it(`should capture the Username & Password upon clicking the 'Login' button`, () => {
    inputUsername.value = 'test-user';
    inputUsername.dispatchEvent(new Event('input'));
    inputPassword.value = 'test-password';
    inputPassword.dispatchEvent(new Event('input'));
    loginButton.click();
    fixture.detectChanges();
    expect(component.loginForm.value.username).toEqual('test-user');
    expect(component.loginForm.value.password).toEqual('test-password');
  });

});
