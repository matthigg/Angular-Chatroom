import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { DeleteChannelService } from './delete-channel.service';

// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

describe('DeleteChannelService', () => {
  let firestore: AngularFirestore;
  let service: DeleteChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        HttpClientTestingModule,
      ]
    }),
    firestore = TestBed.get(AngularFirestore);
    service = TestBed.get(DeleteChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should have an onDeleteChannel() method`, () => {
    spyOn(service, 'onDeleteChannel').and.callThrough();
    service.onDeleteChannel('testChannelId');
    expect(service.onDeleteChannel).toHaveBeenCalled();
  });
});
