// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import {
  MatCardModule,
  MatInputModule,
} from '@angular/material';

// Components
import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountComponent ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
