// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule 
} from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { FooterToolbarComponent } from './footer-toolbar/footer-toolbar.component';
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { SideNavComponent} from './side-nav/side-nav.component';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

// Mocks
class MockAngularFirestore {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let authSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        FooterToolbarComponent,
        NavToolbarComponent,
        SideNavComponent,
      ],
      providers: [ 
        { provide: AngularFirestore, useClass: MockAngularFirestore }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call authService.autoLogin() during the ngOnInit() lifecycle hook', () => {
    authSpy = spyOn(app.authService, 'autoLogin').and.returnValue(null);
    app.ngOnInit();
    expect(authSpy).toHaveBeenCalled();
  });

  // it(`should have as title 'angular-chatroom'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('angular-chatroom');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('angular-chatroom app is running!');
  // });
});
