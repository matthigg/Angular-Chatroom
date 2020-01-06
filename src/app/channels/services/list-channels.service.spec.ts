import { TestBed } from '@angular/core/testing';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { ListChannelsService } from './list-channels.service';

// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

describe('ListChannelsService', () => {
  let firestore: AngularFirestore;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [ 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        HttpClientTestingModule
      ]
    }),
    firestore = TestBed.get(AngularFirestore);
  });

  it('should be created', () => {
    const service: ListChannelsService = TestBed.get(ListChannelsService);
    expect(service).toBeTruthy();
  });
});
