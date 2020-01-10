import { TestBed } from '@angular/core/testing';

// Services
import { ChannelMessagesService } from './channel-messages.service';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

// Mocks
class MockAngularFirestore {
  collections() {}
}

describe('ChannelMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useClass: MockAngularFirestore }
      ]
    });
  });

  it('should be created', () => {
    const service: ChannelMessagesService = TestBed.get(ChannelMessagesService);
    expect(service).toBeTruthy();
  });
});
