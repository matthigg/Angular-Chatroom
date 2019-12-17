import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Angular Material Modules
import { MatListModule } from '@angular/material';

// Components
import { ChannelsComponent } from './channels.component';
import { ListChannelsComponent } from '../shared/list-channels/list-channels.component';

describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let fixture: ComponentFixture<ChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ChannelsComponent,
        ListChannelsComponent,
      ],
      imports: [
        HttpClientTestingModule,
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
