import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// RxJS
import { Observable } from 'rxjs';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingSpinnerModule } from '../../shared/loading-spinner/loading-spinner.module';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import { 
  MatCardModule,
  MatChipsModule,
  MatListModule,
  MatToolbarModule, 
} from '@angular/material';

// Components
import { ChannelComponent } from './channel.component';

// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

// Classes
class MockActivatedRoute {
  params = Observable.create(obs => {
    obs.next('test-route')
  });
}

describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let firestore: AngularFirestore;
  let fixture: ComponentFixture<ChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelComponent ],
      imports: [ 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        HttpClientTestingModule,
        LoadingSpinnerModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [ 
        { 
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
          // useValue: { snapshot: { params: { get(): string { return 'test-route' }}}}
          // useValue: { snapshot: { params: 'test-route' } }
        } 
      ]
    })
    .compileComponents();
    firestore = TestBed.get(AngularFirestore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
