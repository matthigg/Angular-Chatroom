import { TestBed } from '@angular/core/testing';

// RxJS
import { Observable, of } from 'rxjs';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { ListChannelsService } from './list-channels.service';

// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

// Mocks
class MockAngularFirestore {
  collection(mockDocument) {
    return {
      snapshotChanges() {
        return of('test OBSERVABLE')
      }
    }
  }
}

describe('ListChannelsService', () => {
  let service: ListChannelsService;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [ 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AngularFirestore, useClass: MockAngularFirestore }
      ]
    }),
    service = TestBed.get(ListChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should have an onListAllChannels() method`, () => {
    spyOn(service, 'onListAllChannels').and.callThrough();
    service.onListAllChannels();
    expect(service.onListAllChannels).toHaveBeenCalled();
  });
});
