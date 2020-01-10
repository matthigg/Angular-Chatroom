import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Modules
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { 
  MatFormFieldModule,
  MatToolbarModule,
} from '@angular/material';

// Components
import { FooterToolbarComponent } from './footer-toolbar.component';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

// Mocks
class MockAngularFirestore {}

describe('FooterToolbarComponent', () => {
  let component: FooterToolbarComponent;
  let fixture: ComponentFixture<FooterToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterToolbarComponent ],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatToolbarModule,
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
    fixture = TestBed.createComponent(FooterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
