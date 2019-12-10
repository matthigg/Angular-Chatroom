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
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatTabsModule,
} from '@angular/material';

// Components
import { CreateAccountComponent } from '../create-account/create-account.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { LoginComponent } from '../login/login.component';
import { SisuComponent } from './sisu.component';

describe('SisuComponent', () => {
  let component: SisuComponent;
  let fixture: ComponentFixture<SisuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CreateAccountComponent,
        LoadingSpinnerComponent,
        LoginComponent,
        SisuComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTabsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SisuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
