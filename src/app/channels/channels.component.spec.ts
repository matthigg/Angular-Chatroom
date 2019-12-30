import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// RxJS
import { of, Subscription } from 'rxjs';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import { 
  MatFormFieldModule,
  MatInputModule,
  MatListModule 
} from '@angular/material';

// Components
import { ChannelsComponent } from './channels.component';

// Services
// import { ListChannelsService } from './services/list-channels.service';

describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let fixture: ComponentFixture<ChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ChannelsComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        LoadingSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should unsubscribe from all subscriptions during the ngOnDestroy() lifecycle hook`, () => {
    component['createChannelSub'] = new Subscription();
    component['listAllChannelsSub'] = new Subscription();
    spyOn(component['createChannelSub'], 'unsubscribe');
    spyOn(component['listAllChannelsSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['createChannelSub'].unsubscribe).toHaveBeenCalled();
    expect(component['listAllChannelsSub'].unsubscribe).toHaveBeenCalled();
  });

  it(`should retrieve a list of channels using the ListChannelsService`, () => {
    spyOn(component['listChannelsService'], 'onListAllChannels').and.returnValue(
      of({
        'test key 1': { channelName: 'test channel 1'},
        'test key 2': { channelName: 'test channel 2'},
        'test key 3': { channelName: 'test channel 3'},
        'test key 4': { channelName: 'test channel 4'},
        'test key 5': { channelName: 'test channel 5'},
      }),
    );
    component['onListAllChannels']();
    expect(component.allChannels.length).toEqual(5);
  });

  it(`should create a new channel via onCreateChannel()`, () => {
    spyOn(component['createChannelService'], 'onCreateChannel').and.returnValue(
      of({
        // NgForm
        
      }),
    );
  });
});
