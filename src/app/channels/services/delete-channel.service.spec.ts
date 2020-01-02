import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { DeleteChannelService } from './delete-channel.service';

describe('DeleteChannelService', () => {
  let service: DeleteChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    }),
    service = TestBed.get(DeleteChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should have an onDeleteChannel() method`, () => {
    spyOn(service, 'onDeleteChannel').and.callThrough();
    service.onDeleteChannel('testChannelId');
    expect(service.onDeleteChannel).toHaveBeenCalled();
  });
});
