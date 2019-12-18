import { TestBed } from '@angular/core/testing';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { CreateChannelService } from './create-channel.service';

describe('CreateChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: CreateChannelService = TestBed.get(CreateChannelService);
    expect(service).toBeTruthy();
  });
});
