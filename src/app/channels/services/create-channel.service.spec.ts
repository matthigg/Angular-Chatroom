import { TestBed } from '@angular/core/testing';

// @Angular
import { NgForm } from '@angular/forms';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Services
import { CreateChannelService } from './create-channel.service';

describe('CreateChannelService', () => {
  let service: CreateChannelService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.get(CreateChannelService);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should have an onCreateChannel() method`, () => {
    spyOn(service, 'onCreateChannel').and.callThrough();
    service.onCreateChannel(<NgForm>{ 'value': 'testChannelName' });
    expect(service.onCreateChannel).toHaveBeenCalled();
  });
});
