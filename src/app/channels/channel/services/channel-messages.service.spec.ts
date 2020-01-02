import { TestBed } from '@angular/core/testing';

import { ChannelMessagesService } from './channel-messages.service';

describe('ChannelMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelMessagesService = TestBed.get(ChannelMessagesService);
    expect(service).toBeTruthy();
  });
});
