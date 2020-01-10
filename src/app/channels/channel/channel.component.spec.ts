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
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

// Mocks
class MockActivatedRoute {
  params = Observable.create(obs => {
    obs.next('test-route')
  });
}

class MockAngularFirestore {
  firestore = {
    collection() { 
      return {
        doc() { 
          return {
            onSnapshot() {}
          }
        }
      }
    }
  }
}

describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let fixture: ComponentFixture<ChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelComponent ],
      imports: [ 
        HttpClientTestingModule,
        LoadingSpinnerModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [ 
        { provide: ActivatedRoute, useClass: MockActivatedRoute }, 
        { provide: AngularFirestore, useClass: MockAngularFirestore }, 
      ]
    })
    .compileComponents();
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
