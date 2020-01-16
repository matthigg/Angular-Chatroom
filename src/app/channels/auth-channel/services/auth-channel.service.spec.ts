import { TestBed } from '@angular/core/testing';

import { AuthChannelService } from './auth-channel.service';

describe('AuthChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthChannelService = TestBed.get(AuthChannelService);
    expect(service).toBeTruthy();
  });
});
