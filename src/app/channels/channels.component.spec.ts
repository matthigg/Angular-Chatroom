import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteChannelModule } from '../shared/delete-channel/delete-channel.module';
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
import { ListChannelsService } from './services/list-channels.service';

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
        DeleteChannelModule,
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
});
