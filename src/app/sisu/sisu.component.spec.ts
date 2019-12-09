// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

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
import { LoginComponent } from '../login/login.component';
import { SisuComponent } from './sisu.component';

describe('SisuComponent', () => {
  let component: SisuComponent;
  let fixture: ComponentFixture<SisuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CreateAccountComponent,
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
