import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { DeleteChannelService } from './delete-channel.service';

describe('DeleteChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: DeleteChannelService = TestBed.get(DeleteChannelService);
    expect(service).toBeTruthy();
  });
});
