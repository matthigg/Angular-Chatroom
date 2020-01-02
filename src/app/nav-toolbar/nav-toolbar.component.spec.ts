// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import { 
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule 
} from '@angular/material';

// Components
import { NavToolbarComponent } from './nav-toolbar.component';

// Services
import { AuthService } from '../auth/services/auth.service';
import { ToggleSideNavService } from '../side-nav/services/toggle-side-nav.service';

describe('NavToolbarComponent', () => {
  let authService: AuthService;
  let component: NavToolbarComponent;
  let fixture: ComponentFixture<NavToolbarComponent>;
  let toggleSideNavService: ToggleSideNavService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NavToolbarComponent 
      ],
      imports: [ 
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(NavToolbarComponent);
    component = fixture.componentInstance;
    toggleSideNavService = TestBed.get(ToggleSideNavService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`should not show the 'Logout' button if user is not authenticated`, () => {
  //   component.isAuthenticated = false;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.query(By.css('.button-logout'))).toBeFalsy();
  // })

  // it(`should show the 'Logout' button if user is authenticated`, () => {
  //   component.isAuthenticated = true;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.query(By.css('.button-logout'))).toBeTruthy();
  // })

  it(`should call authService.logout() when the 'logout' button is clicked`, () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    const authServiceLogoutSpy = spyOn(authService, 'logout');
    fixture.debugElement.query(By.css('.button-logout')).nativeElement.click();
    expect(authServiceLogoutSpy).toHaveBeenCalled();
  });

  it(`should log the user out after the 'logout' button is clicked`, () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.button-logout')).nativeElement.click();
    expect(component.isAuthenticated).toEqual(false);
  });

  it(`should call toggleSideNavService.handleSideNav() when the 'hamburger' icon is clicked`, () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    const sideNavServiceSpy = spyOn(toggleSideNavService, 'handleSideNav');
    fixture.debugElement.query(By.css('.button-hamburger')).nativeElement.click();
    expect(sideNavServiceSpy).toHaveBeenCalled();
  });
});
