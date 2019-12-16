import { TestBed } from '@angular/core/testing';

import { ListChannelsService } from './list-channels.service';

describe('ListChannelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListChannelsService = TestBed.get(ListChannelsService);
    expect(service).toBeTruthy();
  });
});
