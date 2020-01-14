import { TestBed } from '@angular/core/testing';

import { ChannelUsersService } from './channel-users.service';

describe('ChannelUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelUsersService = TestBed.get(ChannelUsersService);
    expect(service).toBeTruthy();
  });
});
