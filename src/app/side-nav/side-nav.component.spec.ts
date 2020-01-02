import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import {
  MatListModule, 
  MatSidenavModule
} from '@angular/material';

// Components
import { SideNavComponent } from './side-nav.component';

// Services
import { ToggleSideNavService } from './services/toggle-side-nav.service';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let toggleSideNavService: ToggleSideNavService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavComponent ],
      imports: [ 
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatListModule,
        MatSidenavModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    toggleSideNavService = TestBed.get(ToggleSideNavService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should create a subscription to toggleSideNavService.sideNavSubject during ngOnInit()`, () => {
    component.ngOnInit();
    toggleSideNavService.sideNavSubject.next(true);
    fixture.detectChanges();
    expect(component.isSideNavOpen).toEqual(true);
    toggleSideNavService.sideNavSubject.next(false);
    fixture.detectChanges();
    expect(component.isSideNavOpen).toEqual(false);
  });
});
