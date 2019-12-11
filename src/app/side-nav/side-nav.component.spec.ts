import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material';

// Components
import { SideNavComponent } from './side-nav.component';

// Services
import { AuthService } from '../auth/services/auth.service';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavComponent ],
      imports: [ 
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSidenavModule,
      ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
