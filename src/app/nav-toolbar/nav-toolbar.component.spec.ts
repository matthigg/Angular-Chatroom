// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { NavToolbarComponent } from './nav-toolbar.component';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material';

describe('NavToolbarComponent', () => {
  let component: NavToolbarComponent;
  let fixture: ComponentFixture<NavToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavToolbarComponent ],
      imports: [ 
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
});
