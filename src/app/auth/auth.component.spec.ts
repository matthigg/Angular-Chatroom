// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
  MatTabsModule,
} from '@angular/material';

// Components
import { AuthComponent } from './auth.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { LoginComponent } from './login/login.component';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

// Mocks
class MockAngularFirestore {}

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AuthComponent,
        CreateAccountComponent,
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
        MatTabsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AngularFirestore, useClass: MockAngularFirestore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
