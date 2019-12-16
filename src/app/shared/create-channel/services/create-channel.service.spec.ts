import { TestBed } from '@angular/core/testing';

import { CreateChannelService } from './create-channel.service';

describe('CreateChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateChannelService = TestBed.get(CreateChannelService);
    expect(service).toBeTruthy();
  });
});
