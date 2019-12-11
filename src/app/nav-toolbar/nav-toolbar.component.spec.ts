// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material';

// Components
import { NavToolbarComponent } from './nav-toolbar.component';

describe('NavToolbarComponent', () => {
  let component: NavToolbarComponent;
  let fixture: ComponentFixture<NavToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavToolbarComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatToolbarModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should not show the 'Logout' button if user is not authenticated`, () => {
    component.isAuthenticated = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.button-logout'))).toBeFalsy();
  })

  it(`should show the 'Logout' button if user is authenticated`, () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.button-logout'))).toBeTruthy();
  })
});
