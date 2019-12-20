import { TestBed } from '@angular/core/testing';

import { DeleteChannelService } from './delete-channel.service';

describe('DeleteChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteChannelService = TestBed.get(DeleteChannelService);
    expect(service).toBeTruthy();
  });
});
