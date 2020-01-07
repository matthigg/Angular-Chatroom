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

// Mocks
class MockAngularFirestore {
  collection(mockDocument) {
    return {
      add(mockNewChannel) {
        return new Promise((resolve, reject) => { resolve('test PROMISE response') });
      }
    }
  }
}

describe('CreateChannelService', () => {
  let service: CreateChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: AngularFirestore, useClass: MockAngularFirestore}
      ]
    });
    service = TestBed.get(CreateChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should have an onCreateChannel() method`, async () => {
    spyOn(service, 'onCreateChannel').and.callThrough();
    await service.onCreateChannel(<NgForm>{ 'value': 'testChannelName' })
      .then(response => expect(response).toEqual('test PROMISE response'))
      .then(response => expect(service.onCreateChannel).toHaveBeenCalled())
  });
});
