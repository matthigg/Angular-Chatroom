import { TestBed } from '@angular/core/testing';

// Services
import { ChannelMessagesService } from './channel-messages.service';

// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

describe('ChannelMessagesService', () => {
  let firestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ]
    }),
    firestore = TestBed.get(AngularFirestore);
  });

  it('should be created', () => {
    const service: ChannelMessagesService = TestBed.get(ChannelMessagesService);
    expect(service).toBeTruthy();
  });
});
