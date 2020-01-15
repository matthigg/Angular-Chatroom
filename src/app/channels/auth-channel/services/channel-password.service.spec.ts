import { TestBed } from '@angular/core/testing';

import { ChannelPasswordService } from './channel-password.service';

describe('ChannelPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelPasswordService = TestBed.get(ChannelPasswordService);
    expect(service).toBeTruthy();
  });
});
