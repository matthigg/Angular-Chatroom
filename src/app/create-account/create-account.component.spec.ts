// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let inputUsername: HTMLInputElement;
  let inputPassword: HTMLInputElement;
  let inputPasswordRetype: HTMLInputElement;
  let inputEmail: HTMLInputElement;
  let buttonCreateAccount: HTMLButtonElement;
  let testInput: HTMLInputElement;
  let controls: HTMLInputElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountComponent ],
      imports: [
        BrowserAnimationsModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should disable the 'Create Account' button if the 'Username' input field is empty`, () => {
    controls.forEach(control => {
      if (control === inputUsername) {
        control.value = '';
        control.dispatchEvent(new Event('input'));
      } else {
        control.value = 'test@test';
        control.dispatchEvent(new Event('input'));
      }
    })
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(true);
  });

  it(`should disable the 'Create Account' button if the 'Password' input field is empty`, () => {
    controls.forEach(control => {
      if (control === inputPassword) {
        control.value = '';
        control.dispatchEvent(new Event('input'));
      } else {
        control.value = 'test@test';
        control.dispatchEvent(new Event('input'));
      }
    })
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(true);
  });

  it(`should disable the 'Create Account' button if the 'Password Retype' input field is empty`, () => {
    controls.forEach(control => {
      if (control === inputPasswordRetype) {
        control.value = '';
        control.dispatchEvent(new Event('input'));
      } else {
        control.value = 'test@test';
        control.dispatchEvent(new Event('input'));
      }
    })
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(true);
  });

  it(`should disable the 'Create Account' button if the 'Email' input field is empty`, () => {
    controls.forEach(control => {
      if (control === inputEmail) {
        control.value = '';
        control.dispatchEvent(new Event('input'));
      } else {
        control.value = 'test@test';
        control.dispatchEvent(new Event('input'));
      }
    })
    fixture.detectChanges();
    expect(buttonCreateAccount.disabled).toEqual(true);
  });

});
