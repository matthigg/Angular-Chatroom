import { TestBed } from '@angular/core/testing';

// @Angular
import { NgForm } from '@angular/forms';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { CreateChannelService } from './create-channel.service';

// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

describe('CreateChannelService', () => {
  let firestore: AngularFirestore;
  let service: CreateChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        HttpClientTestingModule,
      ],
    });
    firestore = TestBed.get(AngularFirestore);
    service = TestBed.get(CreateChannelService);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should have an onCreateChannel() method`, () => {
    spyOn(service, 'onCreateChannel');
    service.onCreateChannel(<NgForm>{ 'value': 'testChannelName' });
    expect(service.onCreateChannel).toHaveBeenCalled();
  });
});
