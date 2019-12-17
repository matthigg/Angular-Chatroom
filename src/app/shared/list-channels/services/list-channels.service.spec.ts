import { TestBed } from '@angular/core/testing';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { ListChannelsService } from './list-channels.service';

describe('ListChannelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: ListChannelsService = TestBed.get(ListChannelsService);
    expect(service).toBeTruthy();
  });
});
